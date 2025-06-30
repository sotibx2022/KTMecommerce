export const generateClassName=(theme:"light"|"dark") =>{
    return `${theme==='light'?"lightTheme bg-background text-primaryDark":"darkTheme bg-primaryDark text-background"}`
}