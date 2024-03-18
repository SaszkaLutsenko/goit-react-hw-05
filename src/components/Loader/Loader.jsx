import { Grid } from 'react-loader-spinner';

const Loader = () => (
  <Grid
    visible={true}
    width={200}
    color="#808080"
    ariaLabel="loading..."
  />
);

export default Loader;