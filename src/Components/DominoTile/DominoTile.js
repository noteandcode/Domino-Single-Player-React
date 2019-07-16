import React from 'react';
import './DominoTile.css';

const DominoTile = ({firstNum, secondNum, dominoClick, dir, flipped, x, y}) => {
switch(firstNum) {
	case 0:
	switch(secondNum){
		case 0:
		return(
			<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TC0"></span>
			<span className="line"></span>
			<span className="BC0"></span>
		</div>);
				
		case 1:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="line"></span>
			<span className="BC135"></span>
		</div>);
		
		case 2:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="line"></span>
			<span className="BL23456"></span>
			<span className="BR23456"></span>
		</div>);		
		
		case 3:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="line"></span>
			<span className="BL23456"></span>
			<span className="BC135"></span>
			<span className="BR23456"></span>
		</div>);

		case 4:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL23456"></span>
			<span className="BR23456"></span>
			<span className="BR456"></span>
		</div>);
		
		case 5:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL23456"></span>
			<span className="BC135"></span>
			<span className="BR23456"></span>
			<span className="BR456"></span>
		</div>);
		
		case 6:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL6"></span>
			<span className="BL23456"></span>
			<span className="BR23456"></span>
			<span className="BR6"></span>
			<span className="BR456"></span>
		</div>);
	}

	case 1:
	switch (secondNum) {
	case 1:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TC135"></span>
			<span className="line"></span>
			<span className="BC135"></span>
		</div>);
		
		case 2:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TC135"></span>
			<span className="line"></span>
			<span className="BL23456"></span>
			<span className="BR23456"></span>
		</div>);
		
		case 3:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TC135"></span>
			<span className="line"></span>
			<span className="BL23456"></span>
			<span className="BC135"></span>
			<span className="BR23456"></span>
		</div>);
		
		case 4:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TC135"></span>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL23456"></span>
			<span className="BR23456"></span>
			<span className="BR456"></span>
		</div>);
		
		case 5:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TC135"></span>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL23456"></span>
			<span className="BC135"></span>
			<span className="BR23456"></span>
			<span className="BR456"></span>
		</div>);
		
		case 6:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TC135"></span>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL6"></span>
			<span className="BL23456"></span>
			<span className="BR23456"></span>
			<span className="BR6"></span>
			<span className="BR456"></span>
		</div>);
	}

case 2:
	switch(secondNum){

		case 2:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TL23456"></span>
			<span className="TR23456"></span>
			<span className="line"></span>
			<span className="BL23456"></span>
			<span className="BR23456"></span>
		</div>);
		
		case 3:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TL23456"></span>
			<span className="TR23456"></span>
			<span className="line"></span>
			<span className="BL23456"></span>
			<span className="BC135"></span>
			<span className="BR23456"></span>
		</div>);
		
	case 4:
	return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TL23456"></span>
			<span className="TR23456"></span>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL23456"></span>
			<span className="BR23456"></span>
			<span className="BR456"></span>
		</div>);

		case 5:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TL23456"></span>
			<span className="TR23456"></span>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL23456"></span>
			<span className="BC135"></span>
			<span className="BR23456"></span>
			<span className="BR456"></span>
		</div>);
		
		case 6:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TL23456"></span>
			<span className="TR23456"></span>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL6"></span>
			<span className="BL23456"></span>
			<span className="BR23456"></span>
			<span className="BR6"></span>
			<span className="BR456"></span>
		</div>);

	}

case 3:
	switch(secondNum){

		case 3:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TL23456"></span>
			<span className="TC135"></span>
			<span className="TR23456"></span>
			<span className="line"></span>
			<span className="BL23456"></span>
			<span className="BC135"></span>
			<span className="BR23456"></span>
		</div>);
		
		case 4:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TL23456"></span>
			<span className="TC135"></span>
			<span className="TR23456"></span>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL23456"></span>
			<span className="BR23456"></span>
			<span className="BR456"></span>
		</div>);
		
		case 5:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TL23456"></span>
			<span className="TC135"></span>
			<span className="TR23456"></span>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL23456"></span>
			<span className="BC135"></span>			
			<span className="BR23456"></span>
			<span className="BR456"></span>
		</div>);
		
		case 6:
		return(<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TL23456"></span>
			<span className="TC135"></span>
			<span className="TR23456"></span>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL6"></span>
			<span className="BL23456"></span>
			<span className="BR6"></span>		
			<span className="BR23456"></span>
			<span className="BR456"></span>
		</div>);
		
	}

case 4:
	switch(secondNum)	{
case 4:
return(	
	<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
	<span className="TL456"></span>
	<span className="TL23456"></span>
	<span className="TR23456"></span>
	<span className="TR456"></span>
	<span className="line"></span>
	<span className="BL456"></span>
	<span className="BL23456"></span>
	<span className="BR23456"></span>
	<span className="BR456"></span>
</div>
);

case 5:return(
	<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
	<span className="TL456"></span>
	<span className="TL23456"></span>
	<span className="TR23456"></span>
	<span className="TR456"></span>
	<span className="line"></span>
	<span className="BL456"></span>
	<span className="BL23456"></span>
	<span className="BC135"></span>	
	<span className="BR23456"></span>
	<span className="BR456"></span>
</div>
);

case 6:
return(
	<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
	<span className="TL456"></span>
	<span className="TL23456"></span>
	<span className="TR23456"></span>
	<span className="TR456"></span>
	<span className="line"></span>
	<span className="BL456"></span>
	<span className="BL6"></span>
	<span className="BL23456"></span>
	<span className="BR6"></span>		
	<span className="BR23456"></span>
	<span className="BR456"></span>
</div>
);
}

case 5:
	switch(secondNum){

	case 5:
	return(
		<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>	
			<span className="TL456"></span>
			<span className="TL23456"></span>
			<span className="TC135"></span>	
			<span className="TR23456"></span>
			<span className="TR456"></span>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL23456"></span>
			<span className="BC135"></span>	
			<span className="BR23456"></span>
			<span className="BR456"></span>
		</div>
		);
		
	case 6:
	return(
		<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TL456"></span>
			<span className="TL23456"></span>
			<span className="TC135"></span>	
			<span className="TR23456"></span>
			<span className="TR456"></span>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL6"></span>
			<span className="BL23456"></span>
			<span className="BR6"></span>		
			<span className="BR23456"></span>
			<span className="BR456"></span>
		</div>
	);
	}
case 6:
	return(
		<div className={flipped? `domino-${dir}-flipped` : `domino-${dir}`} onClick={() => dominoClick({firstNum, secondNum})}>
			<span className="TL456"></span>
			<span className="TL23456"></span>
			<span className="TL6"></span>
			<span className="TR23456"></span>
			<span className="TR6"></span>
			<span className="TR456"></span>
			<span className="line"></span>
			<span className="BL456"></span>
			<span className="BL6"></span>
			<span className="BL23456"></span>
			<span className="BR6"></span>		
			<span className="BR23456"></span>
			<span className="BR456"></span>
		</div>
		);

case 7:
	switch(secondNum){
		case 8:
				return(
					<div className={flipped? `yyelow-domino-${dir}-flipped` : `yellow-domino-${dir}`} onClick={() => dominoClick(x, y)}>
					</div>
					);
	}
  }
}



export default DominoTile;