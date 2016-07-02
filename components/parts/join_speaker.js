import React from 'react';

const JoinSpeaker = React.createClass({
  start() {
    const speakerName = React.findDOMNode(this.refs.name).value;
    const title = React.findDOMNode(this.refs.title).value;
    this.props.emit('start', { name: speakerName, title: title });
  },

  render() {
    return (
      <form action="javascript:void(0)" onSubmit={this.start}>
        <label>Full Name</label>
          <input ref="name"
                 className="form-control"
                 placeholder="enter full name here.."
                 required />
        <label>Presentation Title</label>
          <input ref="title"
                 className="form-control"
                 placeholder="enter title for this presentation"
                 required />  

        <button className="btn btn-primary">Join</button>
      </form>
    );
  }
});

module.exports = JoinSpeaker;
