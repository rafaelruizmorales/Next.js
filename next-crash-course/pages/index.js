import ArticleList from '../components/ArticleList'

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

