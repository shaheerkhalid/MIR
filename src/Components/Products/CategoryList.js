import React from 'react';
import Link from "@material-ui/core/Link";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
    padding: '0px',
    margin: '0px 0px',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  links: {
    opacity: '0.7',
    fontSize: '15px',
    '&:hover': {
        opacity: '1',
        textDecoration: 'none',
      }
  },
}));

export function PanelListL() {
  const classes = useStyles();

  return (

    <List className={classes.root} >
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListItem >
                <Link className={classes.links} color='primary' underline='none' href="#">ALL CATEGORIES</Link>
              </ListItem>
              <ListItem >
                <Link className={classes.links} color='primary' underline='none' href="#">GUITARS</Link>
              </ListItem>
              <ListItem >
                <Link className={classes.links} color='primary' underline='none' href="#">UKULELE</Link>
              </ListItem>
              <ListItem >
                <Link className={classes.links} color='primary' underline='none' href="#">KEYBOARDS</Link>
              </ListItem>
              <ListItem >
                <Link className={classes.links} color='primary' underline='none' href="#">MANDOLINS</Link>
              </ListItem>
          </ul>
        </li>
    </List>
  );
}

export function PanelListS() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [tag, setTag] = React.useState('ALL CATEGORIES');

    const handleClick = () => {
        setOpen(!open);
    };

    
    
    return (
        <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary={tag} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem >
              <Link className={classes.links} color='primary' underline='none' href="#">ALL CATEGORIES</Link>
            </ListItem>
            <ListItem >
              <Link className={classes.links} color='primary' underline='none' href="#">GUITARS</Link>
            </ListItem>
            <ListItem >
              <Link className={classes.links} color='primary' underline='none' href="#">UKULELE</Link>
            </ListItem>
            <ListItem >
              <Link className={classes.links} color='primary' underline='none' href="#">KEYBOARDS</Link>
            </ListItem>
            <ListItem >
              <Link className={classes.links} color='primary' underline='none' href="#">MANDOLINS</Link>
          </ListItem>
        </List>
      </Collapse>
    </List>
    );
  }