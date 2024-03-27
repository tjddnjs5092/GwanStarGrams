import {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Easing,
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CardFlip from '@/lib/CardFlip';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {useRecoilState} from 'recoil';
import {userInfoState} from '@/store/usrInfoState';
import { getGistContent, updateGist } from "@/types/commAxios";

export const SinInUpScreens = ({navigation, route}) => {
  const cardRef = useRef<CardFlip>(null);
  return (
    <View className="flex-1 bg-black items-center">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-[90%]">
          <CardFlip ref={cardRef}>
            <View className="mt-[60%]">
              <SignIn
                onPressSignUp={() => cardRef.current?.flip()}
                navigation={navigation}
              />
            </View>
            <View className="mt-[30%]">
              <SignUp
                onPressSignIn={() => cardRef.current?.flip()}
                navigation={navigation}
              />
            </View>
          </CardFlip>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = ({onPressSignUp, navigation}) => {
  const [usrName, setUsrName] = useState('');
  const [usrPwd, setUsrPwd] = useState('');
  const [usrInputCheck, setUsrInputCheck] = useState(false);
  const [privateCheck, setPrivateCheck] = useState(true);
  const [focusedInput, setFocusedInput] = useState('');
  const [privateUrl, setPrivateUrl] = useState(require('@/assets/images/private.png'));
  const rotateAnimation = useRef(new Animated.Value(0)).current; // 애니메이션 상태 초기화
  const [usrInfo, setUsrInfo] = useRecoilState(userInfoState);

  const startAnimation = () => {
    rotateAnimation.setValue(0); // 애니메이션 값 초기화
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 750,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => rotateAnimation.setValue(0)); // 애니메이션 완료 후 값을 다시 0으로 설정
  };

  const rotation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // 360도 회전
  });

  useEffect(() => {
    if (usrName !== '' && usrPwd !== '') {
      setUsrInputCheck(true);
    } else {
      setUsrInputCheck(false);
    }
  }, [usrName, usrPwd]);

  const privateCheckFc = () => {
    if (privateCheck) {
      setPrivateCheck(false);
      setPrivateUrl(require('@/assets/images/notPrivate.png'));
    } else {
      setPrivateCheck(true);
      setPrivateUrl(require('@/assets/images/private.png'));
    }
  };

  const [loginCheck, setLoginCheck] = useState(false);
  const login = async () => {
    startAnimation();
    if (usrInputCheck) {
      setLoginCheck(true);
      const data: any [] = await getGistContent('gwanStarGramUsrInFo.json');
      const isUsrNameUsed = data.some(
        item => usrName === item.usrName && usrPwd === item.usrPwd,
      );
      const userInfo = data.find(
        item => usrName === item.usrName && usrPwd === item.usrPwd,
      );

      if (!isUsrNameUsed) {
        setTimeout(() => {
          Alert.alert('아이디 및 비빌번호 확인해주세요.');
          setLoginCheck(false);
        }, 800);
      } else {
        setTimeout(() => {
          Alert.alert(
            '로그인 완료되었습니다!',
            '',
            [
              {
                text: 'OK',
                onPress: async () => {
                  await AsyncStorage.setItem('loginUsrId', usrName);
                  setUsrInfo({
                    ...usrInfo,
                    isLogin: true,
                    usrName: userInfo.usrName,
                    memberInfo: userInfo,
                  });
                  const stringifiedUserInfo = JSON.stringify(userInfo);
                  await AsyncStorage.setItem('userInfo', stringifiedUserInfo);
                  setLoginCheck(false);
                  navigation.navigate('BottomTabNavigation');
                },
              },
            ],
            {cancelable: false},
          );
        }, 800);
      }
    }
    Keyboard.dismiss();
  };

  const getTextInputStyle = (inputName: string) => {
    return focusedInput === inputName ? 'border-red-400' : 'border-ggray-700';
  };

  const onSignUp = () => {
    setUsrName('');
    setUsrPwd('');
    onPressSignUp();
  };

  return (
    <View className="h-60">
      <View className="items-center">
        <Text className="text-white text-4xl mb-3">𝒢𝓌𝒶𝓃𝓈𝓉𝒶𝑔𝓇𝒶𝓂</Text>
      </View>
      <View>
        <TextInput
          className={`p-4 border-2 ${getTextInputStyle(
            'usrName',
          )} text-white rounded-md bg-ggray-800`}
          onChangeText={setUsrName}
          value={usrName}
          autoCapitalize="none"
          placeholderTextColor={'#7e7b7b'}
          placeholder="전화번호, 사용자 이름 또는 이메일"
          onFocus={() => setFocusedInput('usrName')}
          onBlur={() => setFocusedInput('')}
        />
      </View>
      <View
        className={`mt-2 flex-row  bg-ggray-800 border-2 ${getTextInputStyle(
          'usrPwd',
        )} rounded-md items-center`}>
        <TextInput
          className="flex-1 p-4 text-white"
          onChangeText={setUsrPwd}
          value={usrPwd}
          autoCapitalize="none"
          placeholderTextColor={'#7e7b7b'}
          placeholder="비밀번호"
          secureTextEntry={privateCheck}
          onFocus={() => setFocusedInput('usrPwd')}
          onBlur={() => setFocusedInput('')}
        />
        <Pressable onPress={privateCheckFc}>
          <Image className="mr-4" source={privateUrl} />
        </Pressable>
      </View>
      <View className="mt-4 items-end">
        <Text className="text-blue-500">비밀번호를 잊으셨나요?</Text>
      </View>
      <Pressable
        onPress={login}
        className={`h-10 justify-center items-center mt-7 ${
          usrInputCheck ? 'bg-[#0295F5]' : 'bg-[#014A7B]'
        } rounded-md`}>
        {!loginCheck ? (
          <Text
            className={`${usrInputCheck ? 'text-white' : 'text-[#808080]'}`}>
            로그인
          </Text>
        ) : (
          <View style={styles.animation}>
            <Animated.View
              style={[
                styles.anim5,
                {transform: [{rotate: rotation}]}, // 계산된 회전 값 적용
              ]}
            />
          </View>
        )}
      </Pressable>
      <Pressable
        onPress={onSignUp}
        className="h-10 justify-center items-center mt-3 bg-[#0295F5] rounded-md">
        <Text className="text-white">회원가입</Text>
      </Pressable>
    </View>
  );
};

const SignUp = ({onPressSignIn}) => {
  const [usrName, setUsrName] = useState('');
  const [usrNikName, setUsrNikName] = useState('');
  const [usrPwd, setUsrPwd] = useState('');
  const [usrPwdCk, setUsrPwdCk] = useState('');
  const [focusedInput, setFocusedInput] = useState('');
  // 각 필드에 대한 가시성 상태를 독립적으로 관리
  const [isPwdPrivate, setIsPwdPrivate] = useState(true);
  const [isPwdCkPrivate, setIsPwdCkPrivate] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  // 비밀번호 가시성 토글 함수
  const togglePwdVisibility = () => {
    setIsPwdPrivate(!isPwdPrivate);
  };

  // 비밀번호 확인 가시성 토글 함수
  const togglePwdCkVisibility = () => {
    setIsPwdCkPrivate(!isPwdCkPrivate);
  };

  const getTextInputStyle = (inputName: string) => {
    return focusedInput === inputName ? 'border-red-400' : 'border-ggray-700';
  };

  const selectImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 1,
    };
    const result = await launchImageLibrary(options);
    if (result.didCancel) {
      return console.log('cancel');
    }
    if (result.errorMessage) {
      return console.log(result.errorMessage);
    }
    if (result.assets) {
      const apiKey = Config.IMAGE_UPLOAD_API_KEY;
      const uriParts = result.assets[0].uri;
      const fileType = result.assets[0].type;
      const formData = new FormData();
      formData.append('image', {
        uri: uriParts,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        const json = await response.json();
        const source = {uri: json.data.image.url};
        setSelectedImage(source);
        setSelectedImageUrl(json.data.image.url);
        return json;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const validInputCheck = async (inputData: string, messageText: string) => {
    // 한글 포함 여부 검증
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(inputData)) {
      Alert.alert(`${messageText}에 한글이 포함되어있습니다.`);
      return false;
    }
    return true; // 모든 조건을 통과하면 true 반환
  };
  const onPressSignUp = async () => {
    try {
      const results = await Promise.all([
        validInputCheck(usrName, '전화번호, 사용자 이름 또는 이메일'),
        validInputCheck(usrNikName, '닉네임'),
        validInputCheck(usrPwd, '비밀번호'),
        // 비밀번호 확인 등의 추가 검증
      ]);
      if (results.includes(false)) {
        return;
      }

      // 아이디
      if (usrName === '') {
        Alert.alert('전화번호, 사용자 이름 또는 이메일을 입력해주세요.');
        return;
      }
      const data: any [] = await getGistContent('gwanStarGramUsrInFo.json');
      const isUsrNameUsed = data.some(item => usrName === item.usrName);
      if (isUsrNameUsed) {
        Alert.alert('이미 사용중인 전화번호, 사용자 이름 또는 이메일입니다.');
        return false;
      }

      // 닉네임
      if (usrNikName === '') {
        Alert.alert('닉네임을 입력해주세요.');
        return;
      }

      // 비밀번호
      if (usrPwd === '') {
        Alert.alert('비밀번호을 입력해주세요.');
        return;
      }

      if (usrPwdCk === '' || usrPwdCk !== usrPwd) {
        Alert.alert('비밀번호가 다릅니다.');
        return;
      }

      const joinJsonData = [
        {
          usrName,
          usrNikName,
          usrPwd,
          usrImage: selectedImageUrl || '',
        },
      ];
      const updatedContent = [...data, ...joinJsonData];
      const updateStatus: any = await updateGist('gwanStarGramUsrInFo.json', updatedContent);
      if (updateStatus === 200) {
        Alert.alert(
          '회원가입이 완료되었습니다!\n회원가입승인후 1~2분후에 로그인이 가능합니다.',
          '',
          [
            {
              text: 'OK',
              onPress: () => {
                setUsrName('');
                setUsrNikName('');
                setUsrPwd('');
                setUsrPwdCk('');
                setSelectedImage(null);
                setSelectedImageUrl('');
                onPressSignIn();
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        console.log('update Status not 200');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSignIn = () => {
    setUsrName('');
    setUsrNikName('');
    setUsrPwd('');
    setUsrPwdCk('');
    onPressSignIn();
  };

  return (
    <ScrollView className="pb-[200%]">
      <View className="">
        <View className="items-center">
          <Text className="text-white text-4xl mb-3">𝒢𝓌𝒶𝓃𝓈𝓉𝒶𝑔𝓇𝒶𝓂</Text>
        </View>
        <View className="justify-center items-center pt-2 pb-5">
          <Pressable onPress={selectImage}>
            <Image
              className="w-24 h-24 rounded-full border-[#7e7b7b] border-2"
              resizeMode="cover"
              source={selectedImage || require('@/assets/images/noImg.png')}
            />
          </Pressable>
        </View>
        <View>
          <TextInput
            className={`p-4 border-2 ${getTextInputStyle(
              'usrName',
            )} text-white rounded-md bg-ggray-800`}
            onChangeText={setUsrName}
            value={usrName}
            autoCapitalize="none"
            placeholderTextColor={'#7e7b7b'}
            placeholder="전화번호, 사용자 이름 또는 이메일"
            onFocus={() => setFocusedInput('usrName')}
            onBlur={() => setFocusedInput('')}
          />
        </View>
        <View>
          <TextInput
            className={`mt-2 p-4 border-2 ${getTextInputStyle(
              'usrNikName',
            )} text-white rounded-md bg-ggray-800`}
            onChangeText={setUsrNikName}
            value={usrNikName}
            placeholderTextColor={'#7e7b7b'}
            placeholder="닉네임"
            autoCapitalize="none"
            onFocus={() => setFocusedInput('usrNikName')}
            onBlur={() => setFocusedInput('')}
          />
        </View>
        <View
          className={`mt-2 flex-row items-center border-2 ${getTextInputStyle(
            'usrPwd',
          )} rounded-md bg-ggray-800`}>
          <TextInput
            className="flex-1 p-4 text-white"
            onChangeText={setUsrPwd}
            autoCapitalize="none"
            value={usrPwd}
            placeholderTextColor={'#7e7b7b'}
            placeholder="비밀번호"
            secureTextEntry={isPwdPrivate}
            onFocus={() => setFocusedInput('usrPwd')}
            onBlur={() => setFocusedInput('')}
          />
          <Pressable onPress={togglePwdVisibility}>
            <Image
              className="mr-4"
              source={
                isPwdPrivate
                  ? require('@/assets/images/private.png')
                  : require('@/assets/images/notPrivate.png')
              }
            />
          </Pressable>
        </View>
        <View
          className={`mt-2 flex-row items-center border-2 ${getTextInputStyle(
            'usrPwdCk',
          )} rounded-md bg-ggray-800`}>
          <TextInput
            className="flex-1 p-4 text-white"
            onChangeText={setUsrPwdCk}
            value={usrPwdCk}
            placeholderTextColor={'#7e7b7b'}
            autoCapitalize="none"
            placeholder="비밀번호 확인"
            secureTextEntry={isPwdCkPrivate}
            onFocus={() => setFocusedInput('usrPwdCk')}
            onBlur={() => setFocusedInput('')}
          />
          <Pressable onPress={togglePwdCkVisibility}>
            <Image
              className="mr-4"
              source={
                isPwdCkPrivate
                  ? require('@/assets/images/private.png')
                  : require('@/assets/images/notPrivate.png')
              }
            />
          </Pressable>
        </View>
        <Pressable
          onPress={onPressSignUp}
          className="h-10 justify-center items-center mt-3 bg-[#0295F5] rounded-md">
          <Text className="text-white">회원가입</Text>
        </Pressable>
        <Pressable
          onPress={onSignIn}
          className="h-10 justify-center items-center mt-3 bg-[#0295F5] rounded-md">
          <Text className="text-white">로그인</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  animation: {
    // 컨테이너 스타일링 필요시 여기에 추가
  },
  anim5: {
    width: 24,
    height: 24, // React Native에서는 변수 사용이 불가하므로 직접 값 지정
    borderTopWidth: 2,
    borderTopColor: '#007bff', // $color-primary 대신 실제 색상 코드 사용
    borderBottomWidth: 2,
    borderBottomColor: '#007bff', // borderTop와 동일한 값
    borderRightWidth: 2,
    borderRightColor: '#0295F5',
    borderLeftWidth: 2,
    borderLeftColor: '#0295F5', // borderRight와 동일한 값
    borderRadius: 12, // 100% 대신 height/2 값을 사용하여 원 모양 생성
  },
  card: {
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
});
