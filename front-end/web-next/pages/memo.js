import Head from 'next/head'
import ReportCard from '../componenets/MemoReport'

export default function Memo() {
    return (
        <>
            <Head>
                <title>메모 보고</title>
            </Head>
            <ReportCard
                name="Choe"
                memo="TEST"
                datetime="1분 전"
            />
        </>
    )
}