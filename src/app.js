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