import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue"

describe('Counter Component', () => {

    let wrapper;

    beforeEach(() =>{
        wrapper = shallowMount(Counter)
    })

    /*
    test('Debe de hacer match con el snapshot', () => {

        const wrapper = shallowMount(Counter)

        expect(wrapper.html() ).toMatchSnapshot()
        
    })*/

    test('H2 debe de tener el valor por defecto', () => {

        expect(wrapper.find('h2').exists()).toBeTruthy()

        const h2Value = wrapper.find('h2').text()
        expect(h2Value).toBe('Counter')
      
    })


    test('El valor por defecto debe de ser 100 en el p', async() =>{


        //pTags
        const pValue = wrapper.find('[data-testid="counter"]').text()
     

        //expect segundo p === 100
        expect(pValue).toBe("100")

    })

    test('Debe de incrementar en 1 y decrementar el valor del contador ', async() => {


        const [increaseBtn,decreseBtn] = wrapper.findAll('button')

        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await decreseBtn.trigger('click')
        await decreseBtn.trigger('click')

       let value = wrapper.find('[data-testid="counter"]').text()

        expect(value).toBe('101')
      
    })

    test('Debe de establecer el valor por defecto', () => {

       const {start} =  wrapper.props()

       const value = wrapper.find('[data-testid="counter"]').text()

       expect(Number(value)).toBe(start)
    })


    test('Dede mostrar la prop de title', () => {

        const title = 'Hola mundo'

        const wrapper = shallowMount(Counter, {
            props:{
                title,
                //start: '5'
            }
        })


        expect(wrapper.find('h2').text()).toBe(title)

      
    })
    
    
    
    
    
})
