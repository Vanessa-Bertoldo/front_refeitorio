import { Container, ListItem, ListItemText, makeStyles } from "@material-ui/core"
import data from "../../assets/dataJson/fichas.json"
import EventNoteIcon from '@material-ui/icons/EventNote';
import { FixedSizeList } from 'react-window'
import GridThreeColumns from "../grid/grid3x1/gridThreeColumns";

const useStyles = makeStyles({
    position: {
        textAlignLast: "auto"
    },
    customScrollbar: {
        '&::-webkit-scrollbar': {
          width: '16px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#62905B',
          borderRadius: '1px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#CBDEC7',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#013D25',
        },
      },
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: "10px",
        textAlign: 'center',
       
      },
})

export const renderRow = (props, classes) => {
    
    const { index, style } = props;
    return (
      <ListItem button style={style} key={index}>
        <ListItemText>
            <Container className={classes.root}>
                <GridThreeColumns
                    c1={data[index].matricula}
                    c2={data[index].nome}
                    c3={<EventNoteIcon/>}
            />
            </Container>
        </ListItemText>
       </ListItem>
    );
}

function ListPageMain(){
    const classes = useStyles()
    return(
        <Container className={classes.customScrollbar}>
            <FixedSizeList 
                height={500} 
                width={800} 
                itemSize={46} 
                itemCount={20} 
                className={`${classes.position} ${classes.customScrollbar}`}
            >
                {renderRow}
            </FixedSizeList>
        </Container>
    )
}
export default ListPageMain