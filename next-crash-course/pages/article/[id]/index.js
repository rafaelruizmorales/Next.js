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