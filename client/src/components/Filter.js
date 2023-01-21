import React, { Component } from 'react'; 

class Filter extends Component {
  handleMonthChanged(e) {
    const { onSelectCategory} = this.props;
    const selected = e.target.value;
    onSelectCategory(selected);
  };
  render() {
    const { selected, categories } = this.props;
    return (
      <div style={{ marginBottom: 20,textAlign:'center' }}>
        <span style={{fontSize:25}}>Select category : </span>

        <select value={selected}  style={{fontSize:25,width:300,textAlign:'center'}} onChange={this.handleMonthChanged.bind(this)}>
          {categories.map((category, index) => (
            <option value={category} key={index}>
              {category}
            </option>
          ))}
        </select>

      </div>
    );
  }
}

export { Filter };
