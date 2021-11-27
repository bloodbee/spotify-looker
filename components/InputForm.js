import React from 'react'

import { SearchIcon } from '@heroicons/react/solid'

class InputForm extends React.Component {
  // Base setup of this react component
  constructor(props) {
    super(props);
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeySubmit = this.handleKeySubmit.bind(this)
  }

  /**
   * Reset search
   * @param {Event} event 
   */
  handleClear(event) {
    event.preventDefault()
    // reset state
    this.setState({value: ''})
    // call parent clear method
    this.props.clearClicked()
  }

  /**
   * Called when the input value is changed
   * @param {Event} event 
   */
  handleChange(event) {
    this.setState({value: event.target.value})
  }

  /**
   * Called when user click on submit button
   * @param {Event} event 
   */
  handleSubmit(event) {
    event.preventDefault();
    // invoke parent searchSubmitted method
    this.props.searchSubmitted(this.state.value) 
  }

  /**
   * Called when user push ENTER
   * @param {Event} event 
   */
  handleKeySubmit(event) {
    if (event.charCode === 13) {
      // invoke parent searchSubmitted method
      this.props.searchSubmitted(this.state.value)
    }
  }

  render() {
    return (
      <div className="px-4 w-full sm:px-0 sm:w-3/4 mx-auto">
        <div className="mt-1 relative flex flex-col">
          <label htmlFor="search" className="flex text-left float-left">
            What are you looking for ?
            {this.state.value !== '' && (
              <span className="ml-2 text-green-400 hover:cursor-pointer max-w-min" onClick={this.handleClear}>Clear</span>
            )}
          </label>
          <div className="flex flex-1 justify-center">
            <input
              type="text"
              name="search"
              id="search"
              className="focus:ring-green-500 focus:border-green-500 border-r-0 block w-full pr-12 sm:text-sm border-gray-300 rounded-l-md"
              placeholder="Artist, genre, keywords, ..."
              value={this.state.value}
              onChange={this.handleChange}
              onKeyPress={this.handleKeySubmit}
            />
            <button
              type="button"
              className="bg-white py-2 px-3 border border-gray-300 border-l-0 rounded-r-lg shadow-sm text-sm leading-4 font-medium text-green-400 hover:text-white hover:bg-green-400 focus:ring-green-500 focus:border-green-500 focus:outline-none"
              onClick={this.handleSubmit}
            >
              <SearchIcon className="h-full w-5 py-0" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default InputForm