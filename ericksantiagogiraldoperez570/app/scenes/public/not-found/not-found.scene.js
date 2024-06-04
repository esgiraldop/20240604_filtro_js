import styles from './not-found.styles.css'

export function notFoundScene(){
    const $root = document.getElementById("root")
    $root.innerHTML = `
        <div class="errorContainer">
            <h1>Error 404: Not found</h1>
            <h2>The page your are looking for does not exist</h2>
        </div>
    `
}