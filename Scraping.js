
/*
Mutation Observers
1. Making a new MutationObserver object
2. Tell it what to observe
3. What to do with the observed changes/mutations

async function in JavaScript is a function that always returns a Promise and allows you to use the await keyword inside it to work with asynchronous operations more conveniently

Promise in JavaScript is an object that represents the eventual completion (or failure) of an async function
*/

//var isOpen = true

function resetDOMState() {
    const clickedElements = document.querySelectorAll('.clicked');
    clickedElements.forEach(element => {
        element.classList.remove('clicked');
    });
    console.log('DOM state reset');
}

//Function creates a new observer which inspects each station and returns the Food for each station
function startObserving(item){
    let Menu = document.querySelector('#items-div')
    return new Promise((resolve)=>{
    //function will give you an array of mutation records, or, in other words, an array of changes
        const observer = new MutationObserver(mutations=>{
            const foods = []
            //loop through the mutations
            mutations.forEach(record => {
            //Checks the nodes being added to the DOM with the sepcified className
            if(record.removedNodes.length == 0 && record.addedNodes.length > 0 && record.target.classList.contains("menu-item-card"))
            {
                //Newly added items to the DOM are pushed to a list containing all the foods in that subcategory
                foods.push(record.target.innerText.split('\n\n'))
            }
            })

            //Disconnect observer for future iterations
            if(foods.length > 0){
                observer.disconnect();
                resolve(foods)
            }
        });
    
    //Target Node, and list of options
    observer.observe(Menu, {
        childList: true,
        subtree: true
    });

    //Click on the item, activating the callback function for the mutationObserver
    item.click();
})
}

//Function observes when day changes
function startObserving2(item,timeout= 10000)
{
    let calendar = document.querySelector('.menu-subcategories-parent')
    return new Promise((resolve)=>{
        if(item.classList.contains("selected")){
            resolve(item.innerText.split('\n'))
            return;
        }

        let timeoutID;
        
        const observerCallback = new MutationObserver((mutations)=>
        {
            mutations.forEach((mutation)=>{
                if(mutation.target.classList.contains("cal-day-child") && (mutation.target.classList.contains("selected")))
                {
                    observer2.disconnect();
                    clearTimeout(timeoutID)
                    resolve(mutation.target.innerText.split('\n'))
                    return;
                }
            })
        });

        
        
        observer2.observe(calendar, {
            attributes: true,
            attributeFilter: ['class'],
            subtree: true
        });
    

        timeoutID = setTimeout(() => {
            observer2.disconnect();
            console.warn('Timeout: No day selection detected')
            resolve([]); // Resolve with an empty list if timeout occurs
        }, timeout);
        item.click();
    });
}


//dining times
function startObserving3(item, timeout = 3000){
    let dining_times = document.querySelector('.button-bar.menu-category-selection')
    return new Promise((resolve)=>{
        if(item.classList.contains('button-category')){
            resolve(item.innerText)
            return;
        }

        // if(!dining_times){
        //     console.error("Atrium is not open today")
        //     resolve("")
        //     return;
        // }

        let timeoutID2;
        
        const observer3 = new MutationObserver((mutations)=>
        {
            let dining_time = ''
            mutations.forEach((mutation)=>{
                if(mutation.target.innerText === item.innerText && mutation.target.classList.contains("button-category"))
                {
                    dining_time = mutation.target.innerText
                }
            })
        
            if(dining_time != '')
            {
                observer3.disconnect();
                clearTimeout(timeoutID2)
                resolve(dining_time)
                return;
            }
        });
        
        observer3.observe(dining_times, {
            attributes: true,
            attributeFilter: ['class'],
            subtree: true
        });
    
        //setTimeout(() => item.click(), 10);
        item.click()
        
        timeoutID2 = setTimeout(() => {
            observer3.disconnect();
            console.warn("No dining time selected")
            resolve(""); // Resolve with an empty string if timeout occurs
        }, timeout);
    });
}


async function getStations()
{
    let stations = {}
    
    //DOM objects of each station
    const t = document.querySelectorAll('.menu-subcategories-child')

    //Traversing through each station
    for(let i = 0; i<t.length; i++){
        //Indexing the station
        const item = t[i]

        //"Clicked" tracks whether a subcategory has already been clicked or not
        if(!(item.classList.contains("clicked"))){
                //The DOM object with the subcategory is passed to startObserving() as a parameter. stationFoods now contains all the food names, calories, and timeframe available for the food.
                const stationFoods = await startObserving(item)

                //The station's foods are assigned to a dictionary of station keys and list of list values representing the foods
                stations[item.innerText] = stationFoods

                //Add "Clicked" to the classname to record that it has been clicked.
                item.classList.add("clicked")
        }
    }

    //Return the dictionary of stations and their respective foods
    return stations
}


async function getDiningTimes()
{
    let timings_stations = {}
    //Retrieve the DOM objects for the dining times as a list(Breakfast, brunch, lunch, dinner)
    const d = document.querySelectorAll('.app-border.text-center.menu-category-box.button.button-small.capitalize.white.ng-binding.ng-scope')
    //console.log(d.length)
    if(d.length >0){
    //Traverse through the dining times
        for(let k = 0; k<d.length; k++)
        {
            let time = d[k]
                if(!(time.classList.contains("clicked")))
                {
                    try{
                        //Click on the dining time
                        let ts = await startObserving3(time)
                        console.log(ts)
                        if(ts != '')
                        {
                            //console.log(ts)
                            await new Promise(resolve=> setTimeout(resolve,200))
                            
                            //Await until getStations() has executed
                            let stations = await getStations();
                            //console.log("Retrieved food from station")
                            //timings_stations.push(ts)
                            timings_stations[ts] = stations
                            time.classList.add("clicked")
                        }
                        else{
                            console.warn(`${time.innerText} is not available today`)
                            time.classList.add("clicked")
                        }
                    }
                    catch(error)
                    {
                        console.error("Error observing item:",error)
                    }
                }
        }
    }
    return timings_stations
}


async function getDays()
{
    const days_list = document.querySelectorAll(".cal-day-child")
    const days_timings_stations = new Map()
    //let observer = null
    
    for(let m = 0; m<days_list.length; m++)
    {
        let day = days_list[m]
        let date = []
        if(!(day.classList.contains("clicked")))
        {
            let all_food = {}
            try{
                date = await startObserving2(day)
                //console.log(date)
                if(date.length>0){
                    try
                    {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    resetDOMState();
                    console.log(date)
                    all_food = await getDiningTimes();
                    console.log(all_food)
                    days_timings_stations.set(date,all_food);
                    }
                    catch(error){
                        console.error('Error fetching the dining data')
                    }
                }
                else{
                    console.warn(`Timeout: Atrium not available today`)
                }
            }
            catch(error){
                console.error('Error observing day',error)
            }
            day.classList.add("clicked")
            console.log(`Day scraped: ${date}`)
        }
        //console.log(days_timings_stations)
        // resetDOMState();
    }

    if (days_timings_stations.size == days_list.length){     
        return days_timings_stations;
    }
     else{
        console.log("Not all days were scraped")
        return days_timings_stations;
    }
}

//resetDOMState()
const Month_Day_Range = `March ${document.querySelectorAll(".cal-day-child")[0].innerText.split('\n')[0]} - ${document.querySelectorAll(".cal-day-child")[document.querySelectorAll(".cal-day-child").length-1].innerText.split('\n')[0]}`

getDays()
    .then((result)=>{
     console.log(result)
        /*
     const obj = Object.fromEntries(result)
     const jsonString = JSON.stringify(obj, null, 2)

     const fs = require('fs')
     fs.writeFileSync(`TCNJ Eickhoff ${Month_Day_Range}`)
     */
     })


