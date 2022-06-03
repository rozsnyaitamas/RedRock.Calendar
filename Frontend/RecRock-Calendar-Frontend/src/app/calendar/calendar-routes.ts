export const CalendarRoutesParts = {
  login: 'login',
  calendar:'calendar',
  userSettings: 'usersettings'
}


export const CalendarRoutes = {
  login: `/${CalendarRoutesParts.calendar}/${CalendarRoutesParts.login}`,
  calendar: `/${CalendarRoutesParts.calendar}`,
  userSettings: `/${CalendarRoutesParts.calendar}/${CalendarRoutesParts.userSettings}`
}

