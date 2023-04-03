import { Circles } from 'react-loader-spinner';
import { LoaderWrapper } from 'components/Loader/Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <Circles
        height="50"
        width="50"
        color="#3f51b5"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoaderWrapper>
  );
};
