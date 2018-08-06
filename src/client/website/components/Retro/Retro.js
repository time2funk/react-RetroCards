import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Typography
} from 'material-ui';
import { CircularProgress } from 'material-ui/Progress';
import {
  QUERY_ERROR_KEY,
  QUERY_STATUS_FAILURE,
  QUERY_STATUS_KEY,
  QUERY_STATUS_SUCCESS,
  queryFailed,
  QueryShape,
  querySucceeded
} from '../../services/websocket/query';
import Column from '../../containers/Retro/Column';
import Steps from '../../containers/Retro/Steps';
import { initialsOf } from '../../services/utils/initials';

class Retro extends Component {
  componentWillMount() {
    this.joinRetro();
  }

  componentWillReceiveProps(nextProps) {
    const { addColumnQuery, connectQuery, addMessage, moveCardQuery } = this.props;
    const {
      addColumnQuery: nextAddColumnQuery,
      connectQuery: nextConnectQuery,
      moveCardQuery: nextMoveCardQuery
    } = nextProps;
    if (queryFailed(addColumnQuery, nextAddColumnQuery)) {
      addMessage(nextAddColumnQuery[QUERY_ERROR_KEY]);
    }
    if (queryFailed(moveCardQuery, nextMoveCardQuery)) {
      addMessage(nextMoveCardQuery[QUERY_ERROR_KEY]);
    }
    if (querySucceeded(connectQuery, nextConnectQuery)) {
      this.joinRetro();
    }
  }


  onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const { socket } = this.context;
      const { moveCard } = this.props;
      const columnId = destination.droppableId;
      const cardId = draggableId;

      // just to hide the blink before action query done
      const cards = Array.from(this.props.cards);
      const cardIndex = cards.findIndex(card => card.id === cardId);
      cards[cardIndex].columnId = columnId;
      this.setProps = {
        ...cards
      };
      // do the action query
      moveCard(socket, columnId, cardId);
    }
  };

  onDragStart = () => {};
  onDragUpdate = () => {}

  joinRetro = () => {
    const { joinRetro, match: { params: { retroShareId } } } = this.props;
    const { socket } = this.context;
    joinRetro(socket, retroShareId);
  };

  render() {
    const {
      classes,
      columns,
      users,
      history,
      joinRetroQuery: {
        [QUERY_STATUS_KEY]: joinStatus,
        [QUERY_ERROR_KEY]: joinError
      }
    } = this.props;
    switch (joinStatus) {
      case QUERY_STATUS_SUCCESS:
        return (
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragUpdate={this.onDragUpdate}
            onDragEnd={this.onDragEnd}
          >
            <div className={classes.root}>
              <Steps />
              <div className={classes.columns}>
                {columns.map(column => (
                  <Column key={column.id} column={column} />
                ))}
              </div>
              <div className={classes.users}>
                {Object.values(users).map(({ id, name }) => (
                  <Tooltip key={id} title={name} placement="left">
                    <Avatar
                      alt={name}
                      className={classes.avatar}
                    >
                      {initialsOf(name)}
                    </Avatar>
                  </Tooltip>
                ))}
              </div>
            </div>
          </DragDropContext>
        );
      case QUERY_STATUS_FAILURE:
        return (
          <DragDropContext
            onDragEnd={this.onDragEnd}
          >
            <div className={classes.root}>
              <Card className={classes.messageCard}>
                <Typography type="headline">Error</Typography>
                <CardContent>
                  <Typography>{joinError}</Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => history.goBack()}>Back</Button>
                </CardActions>
              </Card>
            </div>
          </DragDropContext>
        );
      default:
        return (
          <DragDropContext
            onDragEnd={this.onDragEnd}
          >
            <div className={classes.root}>
              <Card className={classes.messageCard}>
                <CircularProgress color="primary" />
              </Card>
            </div>
          </DragDropContext>
        );
    }
  }
}

Retro.contextTypes = {
  socket: PropTypes.object.isRequired
};

Retro.propTypes = {
  // Values
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      retroShareId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  })).isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })).isRequired,
  users: PropTypes.object.isRequired,
  // Queries
  connectQuery: PropTypes.shape(QueryShape).isRequired,
  joinRetroQuery: PropTypes.shape(QueryShape).isRequired,
  addColumnQuery: PropTypes.shape(QueryShape).isRequired,
  moveCardQuery: PropTypes.shape(QueryShape).isRequired,
  // Functions
  moveCard: PropTypes.func.isRequired,
  joinRetro: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  // Styles
  classes: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
    messageCard: PropTypes.string.isRequired,
    columns: PropTypes.string.isRequired,
    users: PropTypes.string.isRequired,
    hidden: PropTypes.string.isRequired
  }).isRequired
};

export default Retro;
