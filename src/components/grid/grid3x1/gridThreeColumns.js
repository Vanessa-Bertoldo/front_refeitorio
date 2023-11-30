import { Grid, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: "10px",
        textAlign: 'center',
       
      },
      alignRight: {
        textAlign: "right"
      },
      alignCenter: {
        textAlign: "center"
      }
})

function GridThreeColumns({c1, c2, c3}){
    const classes = useStyles()
    return(
        <Grid container spacing={3}>
            <Grid item xs={4}>
                {c1}
            </Grid>
            <Grid item xs={4} className={classes.alignCenter}>
                {c2}
            </Grid>
            <Grid item xs={4} className={classes.alignRight}>
                {c3}
            </Grid>
        </Grid>
    )
}
export default GridThreeColumns