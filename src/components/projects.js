// @flow

import React from 'react'
import List, { ListItem, ListItemText } from 'material-ui/List'
import {getProjects, getProject, getTickets, report} from "../api/index"

export class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      milestones: [],
      tickets: [],
      report: []
    }
  }

  componentDidMount = () => {
    getProjects()
      .then((data) => this.setState({projects: data}))
  }

  getOption = (id) => {
    getProject(id).then((milestones) => this.setState({milestones: milestones}))
    report(id).then((data) => this.setState({report: data.milestones}))
  }

  getTickets = (project_id, id) => {
    getTickets(project_id, id).then((data) => this.setState({tickets: data}))
  }

  render() {
    return (
      <div>
        <List>
          {this.state.projects.map((project) => (
            <ListItem button key={project.id} onClick={() => this.getOption(project.id)}>
              <ListItemText primary={project.title} secondary="Jan 9, 2014" />
            </ListItem>
            )
          )}
        </List>
        <div>
          <List>
            {this.state.report.map((item) => (
              <ListItem key={item.milestone_id}>
                <div>Remaining time: {(item.hours_estimate_current_active - item.hours_actual_active).toFixed(2)}</div>
                <div>Finish Date: {Math.ceil((item.hours_estimate_current_active - item.hours_actual_active).toFixed(2)/8)}</div>
              </ListItem>
            ))}
          </List>
        </div>
        <div>
          <List>
            {this.state.milestones.map((milestone) => (
                <ListItem button key={milestone.id} onClick={() => this.getTickets(milestone.project_id, milestone.id)}>
                  <ListItemText primary={milestone.title} secondary="Jan 9, 2014" />
                </ListItem>
              )
            )}
          </List>
        </div>
      </div>
    )
  }
}