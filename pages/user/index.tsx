import { User } from 'global';
import { useSession } from 'next-auth/react';
import Button from '../../components/Button';

const UserPage = () => {
    const { data: session, status } = useSession();
    const user = session?.user as User;
    if (!user) return <>Brak użytkownika</>;
    return (
        <main className='flex h-screen w-screen flex-col items-center justify-center gap-6 overflow-hidden align-middle'>
            <section className='flex max-w-sm items-center gap-4 text-lg'>
                <h1 className='border-r border-primary p-4 text-3xl font-bold'>
                    {user.name}
                </h1>
                <span>
                    {user.email}
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

UserPage.displayName = 'UserPage';

export default UserPage;