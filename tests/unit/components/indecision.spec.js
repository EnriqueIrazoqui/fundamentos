import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision.vue";

describe('Indecision Component', () => {

    let wrapper;
    let consoleLogSpy;

    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            answer: "yes",
            forced: false,
            image: "https://yesno.wtf/assets/yes/2.gif"
        })
    }))

    beforeEach(() =>{
        wrapper = shallowMount(Indecision)

        consoleLogSpy = jest.spyOn(console, 'log')

        jest.clearAllMocks()
    })

    test('Hacer match con el snapshot', () => {

        expect(wrapper.html()).toMatchSnapshot()
      
    })

    test('Escribir en el imput no debe de disparar nada (console.log)', async() => {

        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

        const input = wrapper.find('input')
         await input.setValue('Hola Mundo')

         expect(consoleLogSpy).toHaveBeenCalledTimes(1)
         expect(getAnswerSpy).not.toHaveBeenCalled()
    })

    test('Escribir el simbolo de interrogacion ? debe de disparar el getAnswer', async() => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

        const input = wrapper.find('input')
         await input.setValue('Hola Mundo?')

        expect(consoleLogSpy).toHaveBeenCalledTimes(2)
        expect(getAnswerSpy).toHaveBeenCalled()

      
    })

    test('Pruebas en get answer', async () => {
       await  wrapper.vm.getAnswer();

        const img = wrapper.find("img");

        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe("https://yesno.wtf/assets/yes/2.gif")
        expect (wrapper.vm.answer).toBe("Si!")
    })

    test('Pruebas en getAnswer- Fallo en el API', async() => {

        fetch.mockImplementationOnce(() => Promise.reject("API is down"));

        await wrapper.vm.getAnswer();

        //TODO: fallo en el API

        const img =  wrapper.find("img");

        expect (img.exists()).toBeFalsy();
        expect(wrapper.vm.answer).toBe("No se pudo cargar el API");

      
    })
    
    
    
    
    
  
})
