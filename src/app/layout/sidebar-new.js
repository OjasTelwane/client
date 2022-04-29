import React, {useState} from 'react'
import PropTypes from 'prop-types';
import AuthGuard from '../core/guards/authentication.guard';
import { Link, useLocation, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import {  } from 'react-router-dom';
import { connect } from 'react-redux';
import { Pages } from '../shared/constants/routes';
import { logout } from '../core/actions/authentication';
import Permission from '../core/services/permission';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiListItem from '@material-ui/core/ListItem';
import List from '@mui/material/List';

import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import ViewListIcon from '@mui/icons-material/ViewList';
import QuizIcon from '@mui/icons-material/Quiz';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Button from '@mui/material/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import { Icon } from '@iconify/react';
import AddEditQuestion from '../modules/question/add.edit.question';
import QuestionList from '../modules/question/question.list';
import ViewQuestion from '../modules/question/viewQuestion';
import TestTemplate from '../modules/testTemplate/testTemplate';
import DisplayTests from '../modules/testTemplate/displayTests';
import TestResult from '../modules/testPlatform/testResult';
import Dashboard from '../modules/dashboard/dashboard';
import TestComponent from '../modules/testPlatform/test.component';
// import Logs from '../modules/ViewLogs/displayLogs';

import logo from '../../assets/images/IMATMI.png';
import logo1 from '../../assets/images/IMATMIlogo1.png';
import AddEditCompany from '../modules/company/add.edit.company';
import CompanyList from '../modules/company/company.list';
import UserList from '../modules/user/user.list';
import AddEditUser from '../modules/user/add.edit.user';
import TestsList from '../modules/tests-list/tests-list';
import UserPermissions from '../modules/user-permission/userPermissions';
import GroupPermissions from '../modules/group-permission/groupPermissions';
import DownloadLogs from '../modules/ViewLogs/downloadLogs';
import { IconButton } from '@mui/material';


const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`
    }
  });
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
      })
    })
  );

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    drawerPaper: {
      marginTop: '20px',
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    }
  }));
  const ListItem = withStyles({
    root: {
      'width' : 'auto',
      '&$selected': {
        backgroundColor: 'red',
        color: 'white',
        '& .MuiListItemIcon-root': {
          color: 'white'
        }
      },
      '&$selected:hover': {
        backgroundColor: 'purple',
        color: 'white',
        '& .MuiListItemIcon-root': {
          color: 'white'
        }
      },
      '& .MuiTypography-root' : {
        'fontWeight' : '500',
        'color' : '#000',
        'fontSize' : '16px'
      },
      margin : '6px',
      '&:hover': {
        backgroundColor: '#edf9fa',
        color: 'black',
        '& .MuiListItemIcon-root': {
          color: 'black'
        }
      }
    },
    selected: {}
  })(MuiListItem);
const SidebarNew = ({ auth: { isAuthenticated, authLoading }, logout, Window }) => {

  const sideBarData = [];

  const dashboard = {
      id: 1,
      title: 'Dashboard',
      path: Pages.dashboard.link,
      icon: <DashboardIcon/>
    };
    sideBarData.push(dashboard);

  if(Permission.checkPermission('Question', 'List')) {
    const listQuestions = {
      id: 2,
      title: 'Question List',
      path: Pages.list_questions.link,
      icon: <QuestionAnswerIcon/>
    };
    sideBarData.push(listQuestions);
  }

  if(Permission.checkPermission('TestBank', 'List')) {
    const allTests = {
      id: 4,
      title: 'Test Bank',
      path: Pages.all_tests.link,
      icon: <QuizIcon/>
    };
    sideBarData.push(allTests);
  }

  if(Permission.checkPermission('Test', 'List')) {
    const testsList = {
      id: 5,
      title: 'Tests List',
      path: Pages.tests_list.link,
      icon: <QuizIcon/>
    };
    sideBarData.push(testsList);
  }

  if(Permission.checkPermission('Company', 'List')) {
    const listCompanies = {
      id: 6,
      title: 'Companies List',
      path: Pages.list_companies.link,
      icon: <BusinessIcon/>
    };
    sideBarData.push(listCompanies);
  }

  if(Permission.checkPermission('User', 'List')) {
    const listUsers = {
      id: 7,
      title: 'Users List',
      path: Pages.list_users.link,
      icon: <PersonIcon/>
    };
    sideBarData.push(listUsers);
  }

  if(Permission.checkPermission('Company', 'List')) {
    const logs = {
      id : 8,
      title : 'View Logs',
      path : Pages.logs.link,
      icon : <ViewListIcon/>
    };
    sideBarData.push(logs);
  }
    // {
    //   id : 9,
    //   title : 'User Permissions',
    //   path : Pages.user_permissions.link,
    //   icon : <DashboardIcon/>
    // },
    if(Permission.checkPermission('Group', 'List')) {
    const groupPermissions = {
      id : 10,
      title : 'Group Permissions',
      path : Pages.group_permissions.link,
      icon : <DashboardIcon/>
    };
    sideBarData.push(groupPermissions);
  }

    const classes = useStyles();
      // const theme = useTheme();
      const [open, setOpen] = useState(false);
    
      const handleDrawerOpen = () => {
        setOpen(true);
      };
      
      const handleDrawerClose = () => {
        setOpen(false);
      };
      let active = {
        'background' : '#d0d6d5',
        'border-radius' : '5px',
        'color' : '#fff',
        '& .MuiListItemIcon-root': {
          'color': 'primary'
        }
      }
      let active2 = {
        'color' : 'blue'
      }
      let iconStyle = {
        'color' : 'black'
      }
      const location = useLocation();
      return (
        <>
            <Box sx={{ display: 'flex' }}>
            { ( location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/' ) && (
              <>
            
            <Drawer
                variant='permanent' open={open}
                classes={{
                  paper: classes.drawerPaper
                }}
            >
                <DrawerHeader>
                { open===false && ( 
                <Button onClick={handleDrawerOpen
                }>
                <img src={logo1} alt='Card' width='60px' height='100%'></img>
              </Button>
                ) }
                { 
                  open===true && ( <Button onClick={handleDrawerClose
                  }>
                  <img src={logo} alt='Card' width='180px' height='100%'></img>
                </Button>
                ) }
                </DrawerHeader>
                <List>
                {sideBarData.map((menu, index) => (
                    <Link to={menu.path}>
                    <ListItem key={index} style={location.pathname === menu.path ? active : null}>
                    <ListItemIcon style={location.pathname === menu.path ? active2 : null}>
                        {menu.icon}
                    </ListItemIcon>
                    <ListItemText primary={menu.title}/>
                    </ListItem>
                    </Link>
                ))}
                <Link
                    to={Pages.landingPage.link}
                    onClick={() => {
                        logout();
                    }}
                >
                    <ListItem>
                    <ListItemIcon>
                    <LogoutIcon />
                    </ListItemIcon>
                      <ListItemText primary='Logout' />
                    </ListItem>
                </Link>
                </List>
            </Drawer>
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <Switch>
                    <AuthGuard
                    exact
                    path={Pages.dashboard.link}
                    component={Dashboard}
                  />
                  <AuthGuard
                    exact
                    path={Pages.add_question.link}
                    component={AddEditQuestion}
                  />
                  <AuthGuard
                    exact
                    path={Pages.update_question.link}
                    component={AddEditQuestion}
                  />
                  <AuthGuard
                    exact
                    path={Pages.list_questions.link}
                    component={QuestionList}
                  />
                  <AuthGuard
                    exact
                    path={Pages.view_question.link}
                    component={ViewQuestion}
                  />
                  <AuthGuard
                    exact
                    path={Pages.test_creation.link}
                    component={TestTemplate}
                  />
                  <AuthGuard
                    exact
                    path={Pages.test_platform.link}
                    component={TestComponent}
                  />
                  <AuthGuard
                    exact
                    path={Pages.all_tests.link}
                    component={DisplayTests}
                  /> 
                  <AuthGuard
                    exact
                    path={Pages.test_result.link}
                    component={TestResult}
                  />
                  <AuthGuard
                    exact
                    path={Pages.logs.link}
                    component={DownloadLogs}
                    />
                  <AuthGuard
                    exact
                    path={Pages.list_companies.link}
                    component={CompanyList}
                  />
                  <AuthGuard
                    exact
                    path={Pages.add_company.link}
                    component={AddEditCompany}
                  />
                  <AuthGuard
                    exact
                    path={Pages.list_users.link}
                    component={UserList}
                  />
                  <AuthGuard
                    exact
                    path={Pages.add_user.link}
                    component={AddEditUser}
                  />
                  <AuthGuard
                    exact
                    path={Pages.update_user.link}
                    component={AddEditUser}
                  />
                  <AuthGuard
                    exact
                    path={Pages.tests_list.link}
                    component={TestsList}
                  />
                  <AuthGuard
                    exact
                    path={Pages.user_permissions.link}
                    component={UserPermissions}
                  />
                  <AuthGuard
                    exact
                    path={Pages.group_permissions.link}
                    component={GroupPermissions}
                  />
                </Switch>
            </Box>
            </>
            )}
            </Box>
        </>
    )
}
SidebarNew.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
    };

    const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { logout })(SidebarNew);