import Head from 'next/head';
import Link from 'next/link';

function TheApp() {
    return (
    <>
    <Head>
      <title>Pagina de prueba</title>
      <link rel="icon" href="/favion.ico" />
    </Head>
    <h1>This is a test built in Next.js</h1>
    <footer>
    <a href="/"
       target="_blank"
       rel="noopener noreferrer"
       
       >
        Powered by{' '}
        <img src="/vercel.svg" alt="Vercel Logo"  width="500" height="600"/>
       </a>
       <Link href="/test"><a>Pagina de prueba</a></Link>
       </footer>
       </>
   )
     }
  
  export default TheApp;