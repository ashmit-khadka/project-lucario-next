import { redirect } from 'next/navigation';

interface Props {
    params: Promise<{ skill: string }>;
}

export default async function ChaptersRedirect({ params }: Props) {
    const { skill } = await params;
    redirect(`/learn/${skill}`);
}
