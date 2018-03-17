// @flow

import React from 'react'
import { connect } from 'react-redux'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { getProjects, getProject, getTickets, report } from '../api/index'

class _Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      milestones: [],
      tickets: [],
      report: []
    }
  }

  getOption = id => {
    getProject(id).then(milestones =>
      this.setState({ milestones }))
    report(id).then(data => this.setState({ report: data.milestones }))
  };

  getTickets = (project_id, id) => {
    getTickets(project_id, id).then(data => this.setState({ tickets: data }))
  };

  render() {
    console.log(this.props)
    return (
      <div>
        <List>
          {this.props.projects.map(project => (
            <ListItem
              button
              key={project.id}
              onClick={() => this.getOption(project.id)}
            >
              <ListItemText primary={project.title} secondary="Jan 9, 2014" />
            </ListItem>
          ))}
        </List>
        <div>
          <List>
            {this.state.report.map(item => (
              <ListItem key={item.milestone_id}>
                <div>
                  Remaining time:{' '}
                  {(
                    item.hours_estimate_current_active -
                    item.hours_actual_active
                  ).toFixed(2)}
                </div>
                <div>
                  Finish Date:{' '}
                  {Math.ceil((
                      item.hours_estimate_current_active -
                      item.hours_actual_active
                    ).toFixed(2) / 8)}
                </div>
              </ListItem>
            ))}
          </List>
        </div>
        <div>
          <List>
            {this.state.milestones.map(milestone => (
              <ListItem
                button
                key={milestone.id}
                onClick={() =>
                  this.getTickets(milestone.project_id, milestone.id)
                }
              >
                <ListItemText
                  primary={milestone.title}
                  secondary="Jan 9, 2014"
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.projects.projects
})

export const Projects = connect(mapStateToProps)(_Projects)

