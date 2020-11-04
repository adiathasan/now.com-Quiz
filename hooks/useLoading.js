import { useState } from 'react';

const useLoading = () => {
  const [isloading, setIsloading] = useState(false);

  return [isloading, setIsloading];
};

export default useLoading;
