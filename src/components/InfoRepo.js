import React from 'react'
import classes from './RepoInfo.module.css'

const InfoRepo = (props) => {

    let linkText = ''

    let menu

    const newLink = props.value

    if (newLink) {
        menu = (newLink.split('https://github.com/').pop()).split('/');
        for (let i = 0 ; i < menu.length; i++){
            if(i===0){
                let text = menu[i].split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ') 
                linkText+=text + ' '
            } else {
                let text = menu[i].split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ') 
                linkText+= '>' + ' ' + text
            }
        } 
    }

  return (
    <React.Fragment>
        <div className={classes.containers}>
           <a className={classes.link} href={newLink}>{linkText}</a> 
            <svg className={classes.star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="m12.672.668 3.059 6.197 6.838.993a.75.75 0 0 1 .416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 0 1-1.088.79L12 18.347l-6.116 3.216a.75.75 0 0 1-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 0 1 .416-1.279l6.838-.994L11.327.668a.75.75 0 0 1 1.345 0Z"></path></svg>
            <p className={classes.text}>194 k stars</p>
        </div>
    </React.Fragment>
  )
}

export default InfoRepo
