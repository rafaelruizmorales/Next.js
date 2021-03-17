## next-crash-course References:
- Video: https://www.youtube.com/watch?v=mTz0GXj8NN0&t=2598s

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## The basics of Next.js

- Folder Structure of a new project

    - 🗂 PUBLIC folder: 
        - Everything you put in this folder is going to be accesible from the browser. <br />
        Example: http://localhost:3000/favicon.ico

    - 🗂 STYLES folder: 
        - <span style="color: #FF851B">globals.css</span> is a CSS file global for the entire application. You cannot import global stylesheets directly into your components. The <span style="color: #FF851B">globals.css</span> is imported in the <i>pages=/_app.js</i> file
        
        - for every component, we add a new CSS file with the name convention COMPONENT.module.css. <br />
        Example: for the Home component ( in <i>pages/index.js</i> ) we have the <span style="color: #FF851B">Home.module.css</span> CSS file in the styles folder
        
    - 🗂 PAGES folder: 
        - One of the best thing about Next.js is the routing system. You dont need a third party router in order to create new routes. You just put your pages inside the pages folder (your pages are REACT components). <br />
        Exmaple: If you create an <span style="color: #00851B">about.js</span> component on the pages folder, you will be able to visit it by accessing http://localhost:3000/about

- The Head Component
    - In our pages, we can make use of the Head component. <br />
    Example:

    ```javascript
        import Head from 'next/head'

        import styles from '../styles/About.module.css'

        export default function About() {
            return (
                <div>
                    <Head>
                        <title>About Page</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                </div>
            )
        }
    ```

    - Head is used if you want to have a custom title, meta tags...

- Creating a Layout

    - The file <span style="color: #00851B">_app.js</span> inside the pages folder contains the MyApp component. This is a kind of Warper for all the page components.

    ```javascript
        import '../styles/globals.css'

        function MyApp({ Component, pageProps }) {
            return <Component {...pageProps} />
        }

        export default MyApp
    ```

    - That means that, if we modify that file by adding a `<p>Hello</p>` after the component `<Component {...pageProps} />`, all pages will have a p tag with the content Hello on them.

    ```javascript
        import '../styles/globals.css'

        function MyApp({ Component, pageProps }) {
        return (
            <>
                <Component {...pageProps} />
                <p>Hello</p>
            </>
        )
        }

        export default MyApp
    ```

    - This can be used to create a layout for our application, adding there the things that are going to be on every single page, such as the Navigation, etc

    ```javascript
        import Layout from '../components/Layout'

        import '../styles/globals.css'

        function MyApp({ Component, pageProps }) {
            return (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            )
        }

        export default MyApp
    ```

    - Since the Layout component does NOT need a different URL, we will create it on a components folder

    ```javascript
        import Nav from './Nav'
        import Meta from './Meta'
        import Header from './Header'
        
        import styles from '../styles/Layout.module.css'

        const Layout = ({ children }) => {
            return (
                <>
                    <Meta />
                    <Nav />
                    <div className={styles.container}>
                        <main className={styles.main}>
                            <Header />
                            {children}
                        </main>
                    </div>
                </>
            )
        }

        export default Layout
    ```
    - Its CSS will be at `styles/Layout.module.css`

    ```css
        .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }

        .main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            font-size: 1.25rem;
        }
    ```
    
    - Inside the Layout we use other components such as Nav and Meta.

        - Nav: It is our navigation. We use the `Link` imported from `next/link` to create links to pages
            ```javascript
                import Link from 'next/link'

                import navStyles from '../styles/Nav.module.css'

                const Nav = () => {
                    return (
                        <nav className={navStyles.nav}>
                            <ul>
                                <li>
                                    <Link href='/'>Home</Link>
                                </li>
                                <li>
                                    <Link href='/about'>About</Link>
                                </li>
                            </ul>
                        </nav>
                    )
                }

                export default Nav
            ```

        - Meta: We add the meta tags here. remember that we add them inside the `Head` component.<br />
        Here, we also use default props `Meta.defaultProps`, that are the default values these props will have if they are not passed when we use the <Meta > comnponent.

            ```javascript
                import Head from 'next/head'

                const Meta = ({ title, keywords, description }) => {
                    return (
                        <Head>
                            <meta name='viewport' content='width=device-width, initial-scale=1' />
                            <meta name='keywords' content={keywords} />
                            <meta name='description' content={description} />
                            <meta charSet='utf-8' />
                            
                            <link rel='icon' href='/favicon.ico' />
                            
                            <title>{title}</title>
                        </Head>
                    )
                }

                Meta.defaultProps = {
                    title: 'WebDev Newz',
                    keywords: 'web development, programming',
                    description: 'Get the latest news in web dev',
                }

                export default Meta
            ```
- Custom document
    - A custom Document is commonly used to augment your application's `<html>` and `<body>` tags. This is necessary because Next.js pages skip the definition of the surrounding document's markup.

    - To override the default Document, create the file `./pages/_document.js` and extend the Document class as shown below:

        ```javascript
            import Document, { Html, Head, Main, NextScript } from 'next/document'

            class MyDocument extends Document {
                render() {
                    return (
                        <Html lang='en'>
                            <Head />
                            <body>
                                <Main />
                                <NextScript />
                            </body>
                        </Html>
                    )
                }
            }

            export default MyDocument
        ```
    - Bear in mind that Document is only rendered in the server, event handlers like onClick won't work here!

- Fetching data
    - There are 3 different methods we can use to fetch data:

        1. <span style="color: #FF1493">getStaticProps</span> (Static Generation): Fetch data at build time.

        2. <span style="color: #FF1493">getStaticPaths</span> (Static Generation): Specify dynamic routes to pre-render pages based on data.

        3. <span style="color: #FF1493">getServerSideProps</span> (Server-side Rendering): Fetch data on each request.

    - As an example, we are going to use `getStaticProps` on our `index.js` page to get a list of articles from an API. As you can see, we get the list of articles using the fetch API and when we have them we just return an object with the key `props` and value the `articles`. This prop (articles) will be able to be used on our component as a prop!

        - index.js

            ```javascript
                import styles from '../styles/Home.module.css'

                export const getStaticProps = async () => {
                    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=12`)
                    const articles = await res.json()

                    return {
                        props: {
                            articles,
                        },
                    }
                }

                export default function Home({ articles }) {
                    return (
                        <div>
                            <h1>Article List</h1>
                            <ArticleList articles={articles} />
                        </div>
                    )
                }
            ```
        - ArticleItem.js

            ```javascript
                import ArticleItem from './ArticleItem'

                import articleStyles from '../styles/Article.module.css'

                const ArticleList = ({ articles }) => {
                    return (
                        <div className={articleStyles.grid}>
                            {articles.map((article) => (
                                <ArticleItem article={article} />
                            ))}
                        </div>
                    )
                }

                export default ArticleList
            ```
        - ArticleItem.js

            ```javascript
                import Link from 'next/link'

                import articleStyles from '../styles/Article.module.css'

                const ArticleItem = ({ article }) => {
                    return (
                        <Link href={`/article/${article.id}`}>
                            <a className={articleStyles.card}>
                                <h3>{article.title} &rarr;</h3>
                                <p>{article.body}</p>
                            </a>
                        </Link>
                    )
                }

                export default ArticleItem
            ```
- Creating nested routes example -> http://localhost:3000/article/4

    - To create nexted routes, we need a specific folder structure

    ```
        .
        +-- 📦 next-crash-course
            |+-- 📂 pages
                |+-- 📂 article
                    |+-- 📂 [id]
                        |+-- 📜 index.js
    ```

    - index.js is going to be our single article page

        ```javascript
            import { useRouter } from 'next/router'

            export default function article() {
                const router = useRouter();
                const { id } = router.query;

                return (
                    <div>
                        This is the article: { id }      
                    </div>
                );
            }
        ```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
