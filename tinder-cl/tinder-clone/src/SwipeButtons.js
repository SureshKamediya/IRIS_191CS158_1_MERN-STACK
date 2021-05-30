import React from 'react';
import './SwipeButtons.css';
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { IconButton } from '@material-ui/core';

function SwipeButtons() {
    return (
        <div className ="swipeButtons">
            <IconButton>
                <ReplayIcon fontSize = 'large' className = 'swipeButtons_icon'/>
            </IconButton>
            <IconButton>
                <CloseIcon fontSize = 'large' className = 'swipeButtons_icon'/>
            </IconButton>
            <IconButton>
                <StarIcon fontSize = 'large' className = 'swipeButtons_icon'/>
            </IconButton>
            <IconButton>
                <FavoriteIcon fontSize = 'large' className = 'swipeButtons_icon'/>
            </IconButton>
            <IconButton>
                <FlashOnIcon fontSize = 'large' className = 'swipeButtons_icon'/>
            </IconButton>
        </div>
    )
}

export default SwipeButtons
