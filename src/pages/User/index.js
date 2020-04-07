import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Loading,
  LoadingFooter,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends PureComponent {
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.object,
      }),
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    page: 1,
    stars: [],
    loading: true,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadPage();
  }

  loadPage = async (page = 1) => {
    const { route } = this.props;
    const { user } = route.params;
    const { stars } = this.state;

    const response = await api
      .get(`/users/${user.login}/starred`, {
        params: { page },
      })
      .catch((err) => {
        this.setState({ loading: false, refreshing: false });
        Alert.alert(err.message);
        return false;
      });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      loading: false,
      refreshing: false,
    });
  };

  loadMoreStars = async () => {
    const { loading, page } = this.state;
    if (loading) return;
    const newPage = page + 1;
    this.setState({ loading: true, page: newPage });
    this.loadPage(newPage);
  };

  refreshList = async () => {
    this.setState({ refreshing: true, stars: [] }, this.loadPage);
  };

  renderFooter = () => {
    const { loading } = this.state;
    if (!loading) return null;
    return <LoadingFooter />;
  };

  handleNavigate = (repository) => {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repository });
  };

  render() {
    const { stars, loading, refreshing, page } = this.state;
    const { route } = this.props;
    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading && page === 1 ? (
          <Loading />
        ) : (
          <Stars
            data={stars}
            onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
            refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
            initialNumToRender={30}
            onEndReachedThreshold={0.01}
            onEndReached={this.loadMoreStars}
            keyExtractor={(star) => String(star.id)}
            ListFooterComponent={loading && this.renderFooter}
            renderItem={({ item }) => (
              <Starred
                onPress={() => {
                  this.handleNavigate(item);
                }}
              >
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
