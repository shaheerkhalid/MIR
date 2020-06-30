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
    position: 'relative',
    overflow: 'auto',
    padding: '0px',
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
    fontSize: '16px',
    fontWeight: '600',
    '&:hover': {
        opacity: '1',
        textDecoration: 'none',
      }
  },
  innerlinks: {
    opacity: '0.7',
    fontSize: '14px',
    color: 'black',
    fontWeight: '600',
    '&:hover': {
        opacity: '1',
        textDecoration: 'none',
      }
  },
}));

export function PanelListL(props) {
  const classes = useStyles();

  return (

    <List className={classes.root} >
        <li className={classes.listSection}>
          <ul className={classes.ul}>
          <ListItem >
                <Link className={classes.links} color='primary' underline='none' href="/Products">All Categories</Link>
          </ListItem>
          {props.catlist.map(cat => (
                <ListItem
                  key={cat.category_id}
                  align={cat.align}
                  style={{ minWidth: cat.minWidth }}
                >
                  <Link className={classes.innerlinks} color='primary' underline='none' href={"/Products?id="+cat.category_id}>
                    {cat.cat_name}
                  </Link>
                </ListItem>
            ))}
          </ul>
        </li>
    </List>
  );
}

export function PanelListS(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [tag, setTag] = React.useState('All Categories');
    
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
        <List component="div" disablePadding style={{maxHeight: "200px"}}>
        <ListItem >
                <Link className={classes.links} color='primary' underline='none' href="#">All Categories</Link>
          </ListItem>
          {props.catlist.map(catlist => (
                <ListItem
                  key={catlist.category_id}
                  align={catlist.align}
                  style={{ minWidth: catlist.minWidth }}
                >
                  <Link className={classes.links} color='primary' underline='none' href="#">
                    {catlist.cat_name}
                  </Link>
                </ListItem>
            ))}
        </List>
      </Collapse>
    </List>
    );
  }