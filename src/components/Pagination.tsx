import React from 'react';
import {TText, TView, TPressable, TImage} from '@/components/tw';

type Props = {
  pageIndex: number;
  pageData: any;
  className?: string;
  style?: any;
  activeClassName?: string;
};
export const Pagination: React.FC<Props> = ({
  pageIndex,
  pageData,
  className,
  style,
  activeClassName,
}) => {
  return (
    <TView className="flex-row justify-center ">
      {pageData?.map((item: any, idx: number) => (
        <TView
          key={idx}
          style={style}
          className={`w-2 h-2 mr-0.5 rounded-md bg-ggray-600/40 ${className} ${
            pageIndex === idx && (activeClassName || 'bg-white')
          }`}
        />
      ))}
    </TView>
  );
};
