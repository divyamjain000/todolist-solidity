
// // App = {
// //     contracts:{},
// //     load: async()=>
// //     {
// //         await App.loadWeb3()
// //         await App.loadAccount()
// //         await App.loadContract()
// //     },
// //       // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
// //   loadWeb3: async () => {
// //     if (typeof window.ethereum !== 'undefined') {
// //         console.log("Using metamask")
// //         ethereum.request({method:"eth_requestAccounts"})
// //         const provider= new ethers.providers.Web3Provider(window.ethereum)
// //         const signer=provider.getSigner();
// //         // await provider.getNetwork()
// //         // App.setProvider = new ethers.providers.web3Provider(window.ethereum);
// //         App.web3Provider=new ethers.providers.Web3Provider(window.ethereum)
// //         console.log("Using web3")
// //         console.log(provider)
// //     }
// //     else{
// //         window.alert("Please connect to Metamask")
// //     }


// const { ethers } = require("ethers");

   
// //     //   App.web3Provider = web3.currentProvider
// //     //   web3 = new Web3(web3.currentProvider)
// //     // } 
// //     // else {
// //     //   window.alert("Please connect to Metamask.")
// //     // }
// //     // Modern dapp browsers...
// //     // if (window.ethereum) {
// //     //   window.provider = new Web3(ethereum)
// //     //   try {
// //     //     // Request account access if needed
// //     //     await ethereum.enable()
// //     //     // Acccounts now exposed
// //     //     web3.eth.sendTransaction({/* ... */})
// //     //   } catch (error) {
// //     //     // User denied account access...
// //     //   }
// //     // }
// //     // // Legacy dapp browsers...
// //     // else if (window.web3) {
// //     //   App.web3Provider = web3.currentProvider
// //     //   window.web3 = new Web3(web3.currentProvider)
// //     //   // Acccounts always exposed
// //     //   web3.eth.sendTransaction({/* ... */})
// //     // }
// //     // // Non-dapp browsers...
// //     // else {
// //     //   console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
// //     // }
// //   },



// //   loadAccount: async () => {
// //     // Set the current blockchain account
// //     console.log(App)
// //     // const provider = new ethers.providers.Web3Provider(App.web3Provider)
// //     // console.log(provider)
// //     // const resolver=await provider.getResolver(0)
    
// //     web3=new Web3(window.ethereum)
// //     console.log(web3)
// //     App.account = '0xb866C367DB5c4a89bC04CFd135809d5317a8DC88'
// //     console.log(App.account)
    
// //   },
// //   loadContract: async() =>{
// //     // Create a JavaScript version of the smart contract
// //     const Todolist = await $.getJSON('todolist.json')
// //     App.contracts.todolist= TruffleContract(Todolist)
// //     App.contracts.todolist.setProvider(App.web3Provider)

// //     // Hydrate the smart contract with values from the blockchain
// //     console.log(Todolist)
// //   },
// // }
    

// App = {
//     contracts: {},
  
//     load: async () => {
//       await App.loadWeb3()
//       await App.loadAccount()
//       await App.loadContract()
//       await App.render()
//     },
  
//     // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
//     loadWeb3: async () => {
//       if (typeof web3 !== 'undefined') {
//         App.web3Provider = web3.currentProvider
//         web3 = new Web3(web3.currentProvider)
//       } else {
//         window.alert("Please connect to Metamask.")
//       }
//       // Modern dapp browsers...
//       if (window.ethereum) {
//         window.web3 = new Web3(ethereum)
//         try {
//           // Request account access if needed
//           await ethereum.enable()
//           // Acccounts now exposed
//           web3.eth.sendTransaction({/* ... */})
//         } catch (error) {
//           // User denied account access...
//         }
//       }
//       // Legacy dapp browsers...
//       else if (window.web3) {
//         App.web3Provider = web3.currentProvider
//         window.web3 = new Web3(web3.currentProvider)
//         // Acccounts always exposed
//         web3.eth.sendTransaction({/* ... */})
//       }
//       // Non-dapp browsers...
//       else {
//         console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
//       }
//     },
  
//     loadAccount: async () => {
//       // Set the current blockchain account
//       App.account = "0xb866C367DB5c4a89bC04CFd135809d5317a8DC88"
//     //   console.log(web3.eth)
//     //   console.log(App.account)
//     },
  
//     loadContract: async () => {
//       // Create a JavaScript version of the smart contract
//       const todoList = await $.getJSON('todolist.json')
//       App.contracts.todolist = TruffleContract(todoList)
//       App.contracts.todolist.setProvider(App.web3Provider)
  
//       // Hydrate the smart contract with values from the blockchain
//       App.todoList = await App.contracts.todolist.deployed()
//     },
//     render: async () => {
//         // Prevent double render
//         if (App.loading) {
//           return
//         }
    
//         // Update app loading state
//         App.setLoading(true)
    
//         // Render Account
//         $('#account').html(App.account)
    
//         // Render Tasks
//         await App.renderTasks()
    
//         // Update loading state
//         App.setLoading(false)
//       },
// }

// $(()=>{
//     $(window).load(()=>{
//         App.load()
//     })
// })
App={
  loading:false,
    contracts:{},
    load: async()=>{

        await App.loadEther()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    loadEther :  async()=> {
        if (typeof window.ethereum !== 'undefined') {
            console.log("found metamask");
            ethereum.request({method:"eth_requestAccounts"})
            const provider=new ethers.providers.Web3Provider(window.ethereum)
            App.Web3Provider=provider
            // }).catch(()=>{
            //     console.log("user denied access");

            // })
        }
    },
    loadAccount: async()=>{
        App.account=await App.Web3Provider.getSigner().getAddress()
       
    },
    loadContract: async()=>{
        const todoList=await $.getJSON("todolist.json");
        App.contracts.todolist=TruffleContract(todoList);
        console.log(todoList)
        console.log(App.Web3Provider)
        App.contracts.todolist.setProvider(window.ethereum);
        App.todolist=await App.contracts.todolist.deployed();

    },


  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  renderTasks: async () => {
    // Load the total task count from the blockchain
    const count = await App.todolist.count()
    const $taskTemplate = $('.taskTemplate')

    // Render out each task with a new task template
    for (var i = 1; i <= count; i++) {
      // Fetch the task data from the blockchain
      const task = await App.todolist.tasks(i)
      const taskId = task[0].toNumber()
      const taskContent = task[1]
      const taskCompleted = task[2]

      // Create the html for the task
      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.content').html(taskContent)
      $newTaskTemplate.find('input')
                      .prop('name', taskId)
                      .prop('checked', taskCompleted)
                      .on('click', App.toggleCompleted)

      // Put the task in the correct list
      if (taskCompleted) {
        $('#completedTaskList').append($newTaskTemplate)
      } else {
        $('#taskList').append($newTaskTemplate)
      }

      // Show the task
      $newTaskTemplate.show()
    }
  },

  createTask: async () => {
    App.setLoading(true)
    const content = $('#newTask').val()
    await App.todolist.createTask(content,{from:App.account})
    window.location.reload()
  },

  toggleCompleted: async (e) => {
    App.setLoading(true)
    const taskId = e.target.name
    await App.todolist.toggleCompleted(taskId,{from:App.account})
    window.location.reload()
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }

}
$(()=>{
    $(window).load(()=>{
        App.load()
    })
})