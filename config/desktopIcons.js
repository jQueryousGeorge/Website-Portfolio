import myComputerIcon from '../public/assets/icons/myComputer.ico'

const ICON_IMAGES = {
    computer: myComputerIcon,
}

export const initialDesktopIcons = [
    {
        id: 'computer',
        title: 'My Computer',
        image: ICON_IMAGES.computer,
        position: { x: 50, y: 50 }
    }
]