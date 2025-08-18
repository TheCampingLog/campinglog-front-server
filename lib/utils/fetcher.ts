const fetcher = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args);

  console.log("fetcher 실행");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default fetcher;
