/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: AppInitialState) {
  const { currentUser } = initialState ?? {};
  const permissionList = currentUser?.permissionList || [];
  const isAdmin = currentUser?.username === 'admin';
  return {
    normalRouteFilter: (route: any) => {
      console.log(route);

      return isAdmin || permissionList.includes(route.permission);
    },
  };
}
