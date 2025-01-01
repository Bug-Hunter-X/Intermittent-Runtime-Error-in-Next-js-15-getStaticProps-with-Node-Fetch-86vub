```javascript
// pages/aboutSolution.js
import fetch from 'node-fetch';

export async function getStaticProps() {
  const maxRetries = 3;
  const retryDelay = 2000; // 2 seconds

  async function fetchData(retries = 0) {
    try {
      const response = await fetch('https://api.example.com/data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (retries < maxRetries) {
        console.error(`Attempt ${retries + 1} failed. Retrying in ${retryDelay}ms`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return fetchData(retries + 1);
      } else {
        console.error('Maximum retries exceeded.', error);
        return null; // Return null to handle the failure gracefully
      }
    }
  }

  const data = await fetchData();

  return {
    props: {
      data,
    },
  };
}

export default function About({ data }) {
  if (data === null) {
    return <div>Failed to fetch data</div>;
  }
  return (
    <div>
      <h1>About Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```