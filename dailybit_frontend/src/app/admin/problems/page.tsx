import styles from '@/styles/pages/admin/admin.module.scss'

export default async function page(){
    const response = await fetch("http://localhost:8080/api/problems", {
        cache: "no-store",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    console.log(data);
    return(
        <div
        className={styles.problemsSection}
        >
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Section</th>
                        <th>Chapter</th>
                        <th>Time Limit</th>
                        <th>Timeout</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((problem: any) => {
                        return (
                            <tr>
                                <td>{problem['id']}</td>
                                <td>{problem['problemName']}</td>
                                <td>{problem['sectionName']}</td>
                                <td>{problem['chapterId']}</td>
                                <td>{problem['timeLimit']}</td>
                                <td>{problem['timeout']}</td>
                                <td>edit delete</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}