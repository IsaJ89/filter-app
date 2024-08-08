import React, {Component} from 'react';
import Search from './search';
import Card from './card';
import Slider from './slider';
import Checkbox from './checkbox';
import Sort from './sort';

class App extends Component {

    state = {
        data: [
            {name:"Oneplus 8T", price: 51000, brand:"Oneplus"},
            {name:"Oneplus 7T", price: 35000, brand:"Oneplus"},
            {name:"Samsung Galaxy 10", price: 15000, brand:"Samsung"},
            {name:"Samsung Note 10", price: 85000, brand:"Samsung"},
            {name:"Apple iPhone 7", price: 25000, brand:"Apple"},
            {name:"Apple iPhone 13", price: 100000, brand:"Apple"},
            {name:"Apple iPhone 11", price: 65000, brand:"Apple"},
            {name:"Redmi Note 6 Pro", price: 18000, brand:"Redmi"},

        ],
        filter: [
            {name:"Oneplus 8T", price: 51000, brand:"Oneplus"},
            {name:"Oneplus 7T", price: 35000, brand:"Oneplus"},
            {name:"Samsung Galaxy 10", price: 15000, brand:"Samsung"},
            {name:"Samsung Note 10", price: 85000, brand:"Samsung"},
            {name:"Apple iPhone 7", price: 25000, brand:"Apple"},
            {name:"Apple iPhone 13", price: 100000, brand:"Apple"},
            {name:"Apple iPhone 11", price: 65000, brand:"Apple"},
            {name:"Redmi Note 6 Pro", price: 18000, brand:"Redmi"},
        ],
        selectedBrands: [],
        searchField : "",
        sortCheckBox: 0,
        sliderValue: 100000
        
    }

    onSort(status){
        let finalArray = []
        // Fetch the data and filter arrays from state
        let filterArray = this.state.filter;
        let dataArray = this.state.data;

        let copyOfFilterArray = structuredClone(filterArray)

        // Sort if the checkbox is checked
        if(status){
            console.log(`status has been found to be true...`)
            copyOfFilterArray.sort((item1, item2) => item1.price - item2.price)
            finalArray = copyOfFilterArray
        }
        else{
            console.log(`status has been found to be false...`)
            finalArray = dataArray;
            
        }

        console.log(`filterArray is ${JSON.stringify(filterArray)}`)
        console.log(`finalArray is ${JSON.stringify(finalArray)}`)

        // Update the state
        this.setState({
            ...this.state,
            filter: finalArray
        })
    }

    onCheck(value, name) {
        console.log(`value is ${value} and name is ${name}`) 
        console.log(`The current value of state is ${JSON.stringify(this.state)}`) 

        // Fetch the selected brands array
        let selectedBrandsArray = [...this.state.selectedBrands]
        console.log(`list of selected brands before any processing is ${JSON.stringify(selectedBrandsArray)}`)

        if(value){
            console.log(`value has been found to be true...`)
            selectedBrandsArray.push(name);
        }
        else{
            selectedBrandsArray = selectedBrandsArray.filter((brand) => {
                return brand !== name;
            })
        }

        console.log(`selectedBrandsArray before updation of state is ${JSON.stringify(selectedBrandsArray)}`)
        this.setState({
            ...this.state,
            selectedBrands: selectedBrandsArray
        }, 
        () => {
            
            // Fetch the selected brands array
            let finalListOfSelectedBrands = [...this.state.selectedBrands]
            console.log(`Final list of selected brands is ${JSON.stringify(finalListOfSelectedBrands)}`)

            // Fetch the data array
            let newDataArray = [...this.state.data]
            console.log(`newFilteredaArray before updation is ${JSON.stringify(newDataArray)}`)
            
            if(finalListOfSelectedBrands.length !== 0){
                console.log(`we have a list of selected brands...`)
                let newFilteredArray = newDataArray.filter((brand) => {
                return finalListOfSelectedBrands.includes(brand.brand)
                })
        
                this.setState({
                    ...this.state,
                    filter: newFilteredArray
                },
                () => {
                    console.log(`the final filter array is ${JSON.stringify(this.state.filter)}`)
                })
            }
            else{
                console.log(`We have a blank selected brands array...`)
                this.setState({
                    ...this.state,
                    filter: this.state.data
                }, 
                () => {
                    console.log(`The final filter array is ${JSON.stringify(this.state.filter)}`)
                })
            }
        }) // End of first arrow function callback inside setState
    }
    
    
    // Return an array containing only brand names
    makeSet() {
        // Fetch the data array
        let dataArray = this.state.data;

        let brandNameSet = new Set();

        dataArray.forEach( (item) =>{
            brandNameSet.add(item.brand)
        })

        return brandNameSet;
    }
    
    // Process the input in the slider
    onSlide(value) {
        
        // Fetch the filter array
        let dataArray = [...this.state.data];
        
        // Filter based on the value of the slider
        let newfilteredArray = dataArray.filter( (item) => {
            return item.price <= value
        })
        
        // Update filter and slideraValue and retain everything else
        this.setState( {
            ...this.state,
            filter: newfilteredArray,
            sliderValue: value
        })
    }
    
    
    // Process the input in the search field
    onSearch(value) {
        
        console.log(`Value passed to search is ${value}`)
        let dataArray = []

        if(this.state.sliderValue === 100000) {
            // Fetch the data array
            dataArray = [...this.state.data];
        }
        else{
            // Fetch the filter array
            dataArray = [...this.state.filter];
        }
        
        
        // Filter based on the value of the input field
        let newFilteredArray = dataArray.filter( (item) => {
            return item.name.toLowerCase().includes(value.toLowerCase())
        })

        // Inside state, update filter and keep data the same
        this.setState( {
            data: dataArray,
            filter: newFilteredArray
        })
    }
    
    render() {

        return(
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-2'>
                        <div className='row'>
                            <div className='col-12'>
                                <Search onSearch={this.onSearch.bind(this)} />
                            </div>
                            <div className='col-12 mt-5'>
                                <Slider onSlide={this.onSlide.bind(this)}/>
                            </div>
                            <div className='col-12 mt-5'>
                                <p>Select Brand</p>
                                {   
                                    // Refer notes.txt
                                    Array.from(this.makeSet()).map( (brand, index) => {
                                        return <Checkbox name={brand} key={index} onCheck={this.onCheck.bind(this)}/>
                                    })
                                }                           
                            </div>
                        </div>
                    </div>
                    <div className='col-10'>
                        <div className='row'>
                            <div className='col-12'>
                                <Sort onSort={this.onSort.bind(this)}/>
                            </div>
                        </div>
                        <div className='row'>
                            {
                                this.state.filter.map( (item, index) => {
                                    return  <div key={index} className='col-4 mt-5'>
                                                <Card name={item.name} price={item.price}/>
                                            </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;