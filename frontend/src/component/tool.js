import personicon from '../assets/icon/personicon.png'
import themeicon from '../assets/icon/themeicon.png'
import bellicon from '../assets/icon/bell.png'

export function Tool() {
    return (
        <div className='container'>
            <div className='item-img'>
                <img src={personicon} alt='personicon' className='tool-icon' onClick={(e)=>onClick(e)}/>
            </div>
            <div className='item-img'>
                <img src={themeicon} alt='themeicon' className='tool-icon' onClick={(e)=>onClick(e)}/>
            </div>
            <div className='item-img'>
                <img src={bellicon} alt='bellicon' className='tool-icon' onClick={(e)=>onClick(e)}/>
            </div>
        </div>
    )
}

function onClick(e) {
    console.log(e)
    console.log(e.target.alt)
}