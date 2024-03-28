import axios from "axios";
import Config from "react-native-config";

// GitHub Gist에 대한 Axios 인스턴스 설정
const githubAPI = axios.create({
  baseURL: 'https://api.github.com/gists',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Config.GITHUB_API_KEY}`,
  },
});

const githubKey: string = Config.GITHUB_API_KEY || '';

// 특정 Gist의 특정 파일 내용을 가져오는 함수
export const getGistContent = async (
  filename: string
): Promise<any> => { // 여기서 `any` 대신 더 구체적인 타입을 사용하는 것이 좋습니다.
  try {
    let gistsUri: string | undefined = '';
    if (filename === 'gwanStarGramUsrInFo.json') {
      gistsUri = Config.GISTS_USRINFO_URI;
    } else if (filename === 'gwanStarGramsBoard.json') {
      gistsUri = Config.GISTS_BOARD_URI;
    }
    const response = await githubAPI.get(`/${gistsUri}`);
    return JSON.parse(response.data.files[filename].content);
  } catch (error) {
    console.error('getGistContent Error:', error);
  }
};

// GitHub Gist에 대한 파일 내용을 업데이트하는 함수
export const updateGist = async (
  filenames: string,
  filesContent: any
): Promise<any> => {
  try {
    console.log('filename : ', filenames);
    console.log('filesContent : ', filesContent);
    const responseBody: any = JSON.stringify({
      gist_id: githubKey,
      description: 'An updated gist description',
      files: {
        [filenames]: {
          content: JSON.stringify(filesContent),
        },
      },
    });
    const response = await githubAPI.patch(`/${gistsUri}`, responseBody);
    return response.status;
  } catch (error) {
    console.error('Error:', error);
  }
};
