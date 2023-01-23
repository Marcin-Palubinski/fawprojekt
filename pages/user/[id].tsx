import { User } from 'global';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from '../../axios';
import useSWR from 'swr';
import Button from '../../components/Button';

const userFetcher = (url: string, data: any) => axios.get(url, data).then(res => res.data);

const UserPageId = () => {
    const { data: session, status } = useSession();
    const user = session?.user as User;
    const router = useRouter();
    const { id } = router.query;
    const { data: foundUser, error, isLoading } = useSWR(`/api/user/${id}`, userFetcher);
    if (isLoading) return <>Ładowanie...</>;
    if (!foundUser) return <>Brak użytkownika</>;

    return (
        <main className='flex h-screen w-screen flex-col items-center justify-center gap-6 overflow-hidden align-middle'>
            <section className='flex max-w-sm items-center gap-4 text-lg'>
                <h1 className='border-r border-primary p-4 text-3xl font-bold'>
                    {foundUser.name}
                </h1>
                <span>
                    {foundUser.email}
                </span>
            </section>
            <nav className='w-full max-w-sm space-y-2'>
                <Button
                    href='/'
                    className='!w-full'
                >
                    Strona główna
                </Button>
                <Button
                    className='!w-full'
                    onClick={() => history.back()}
                >
                    Powrót do poprzedniej strony
                </Button>
            </nav>
        </main>
    );
};

UserPageId.displayName = 'UserPageId';

export default UserPageId;