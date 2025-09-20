import PageLayout from '@/components/PageLayout';

const defaultValue = `class Solution{
    public static void main(String args[]){
        //code here
    }
}`;

const problemIds = ['JV001', 'JV002', 'JV003'];

export default function layout(
    {
        children,
    }:
    Readonly<{
        children: React.ReactNode
    }>
){
    
    return (
        <PageLayout
        children = {children}
        defaultValue={defaultValue}
        problemIds={problemIds}
        aiTitle='Control Flow Statements'
        />
    )
}