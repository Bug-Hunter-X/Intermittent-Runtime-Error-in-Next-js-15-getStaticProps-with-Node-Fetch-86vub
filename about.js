```javascript
// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to my Next.js app</h1>
      <Link href="/about">
        <a>Go to About Page</a>
      </Link>
    </div>
  );
}
```
```javascript
// pages/about.js
import fetch from 'node-fetch'; // Import fetch

export async function getStaticProps() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}

export default function About({ data }) {
  return (
    <div>
      <h1>About Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```