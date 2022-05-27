export default function Sidebar(){
    const onClickAlert = () => {
        console.log("click li");
    }
    return (
        <>
        <h1>Archive</h1>
            <ul>
                <li onClick={onClickAlert}>May 2021</li>
                <li onClick={onClickAlert}>April 2021</li>
                <li onClick={onClickAlert}>March 2021</li>
                <li onClick={onClickAlert}>February 2021</li>
                <li onClick={onClickAlert}>January 2021</li>
                <li onClick={onClickAlert}>December 2020</li>
                <li onClick={onClickAlert}>November 2020</li>
                <li onClick={onClickAlert}>October 2020</li>
                <li onClick={onClickAlert}>September 2020</li>
            </ul>
        </>
    )
}