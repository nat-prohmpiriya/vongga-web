export default interface BaseProp {
    className?: string // ค่า class สำหรับ CSS
    style?: React.CSSProperties // ค่า style object
    children?: React.ReactNode // รับ children
}
