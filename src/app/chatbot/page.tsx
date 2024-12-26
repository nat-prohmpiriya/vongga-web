"use client"
import { Button, Input, Select } from 'antd';
import { useState } from 'react';
import { BsSend } from "react-icons/bs";



const ChatBotPage = () => {
    const [message, setMessage] = useState('');
    const [selectedModel, setSelectedModel] = useState('claude3.5');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        console.log('Sending message:', message);
        console.log('Selected model:', selectedModel);
        setMessage('');
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className='grid grid-cols-5 mt-16 h-[calc(100vh-64px)]'>
            <div className='col-span-1 bg-white h-[calc(100vh-64px)] p-4'>
                <Select
                    defaultValue="claude3.5"
                    style={{ width: '100%', height: '40px' }}
                    onChange={handleChange}
                    options={[
                        { value: 'claude3.5', label: 'Claude 3.5' },
                        { value: 'gpt4o', label: 'GPT 4' },
                        { value: 'gpt4omini', label: 'GPT 4o mini' },
                        { value: 'gemini1.5Flash', label: 'Gemini 1.5' },
                        { value: 'gemini2.0Flash', label: 'Gemini 2.0' },
                    ]}
                />

            </div>
            <div className='col-span-4 bg-gray-100 relative p-4'>
                <div className='h-[calc(100vh-180px)] overflow-y-auto border-2 border-gray-300 rounded-lg p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat numquam adipisci, recusandae aliquam ipsa, voluptatibus reiciendis sapiente iusto iste error id cumque nesciunt. Accusantium incidunt id molestias dolorum perferendis dolor odit debitis consectetur quas asperiores, ad dolores unde aliquam? Officiis architecto necessitatibus rerum! Temporibus voluptatem nesciunt odio et est ratione suscipit nostrum, modi culpa quasi autem, labore dolores excepturi corporis, sed corrupti ab tempora! Fugiat soluta ad laudantium aspernatur consectetur sunt, et, delectus deleniti nisi unde excepturi voluptatibus consequuntur repellat hic alias quo! Aliquid reprehenderit at, eius quibusdam asperiores perferendis numquam, aut vero vel eos ducimus recusandae quidem! Expedita nobis sed sunt voluptates, aliquam mollitia minus deleniti amet a libero maiores nulla sint distinctio at, perspiciatis repellendus animi accusamus eum unde est repellat aperiam. Praesentium consequuntur voluptas placeat delectus sapiente eum saepe repudiandae incidunt earum, dignissimos aut, at eveniet. Asperiores laboriosam voluptatibus laudantium quaerat fugiat dolores accusamus esse officia, quia iure saepe! Nemo cupiditate saepe totam omnis repellendus enim maiores. Nesciunt earum reiciendis repudiandae eum odit minima id ipsa nemo voluptates animi. Laudantium fuga ipsam sunt mollitia! Excepturi recusandae atque asperiores. Provident harum accusamus repellat similique soluta dolores sed praesentium ipsam, enim, beatae inventore aperiam voluptas aspernatur dolore. Dolore fugiat architecto, quam blanditiis commodi minus deleniti natus. Expedita voluptate velit ex, qui mollitia aspernatur totam provident ipsam minima, unde vero facilis magnam necessitatibus inventore illum obcaecati fuga esse tempore amet iusto ea veniam. Perspiciatis inventore veniam molestias, aut quas laboriosam dolores iusto sit suscipit fugiat magnam tenetur culpa sapiente nesciunt repudiandae sunt? Soluta, repellendus dicta vel porro atque molestias iste officiis praesentium, distinctio ipsam sed libero repellat cupiditate laborum officia, laudantium dolor esse. Cum laboriosam non fugit! Veniam mollitia asperiores, eveniet repellendus facere, doloremque, quidem unde voluptatum eum minima et quasi sint placeat. Aut obcaecati ullam, reprehenderit cupiditate, dignissimos perspiciatis officiis fugiat atque, quaerat harum voluptatum error amet numquam laborum expedita! Quibusdam quaerat error architecto fugit nam consectetur quidem deserunt doloremque! Magni porro vero ipsam, maiores inventore asperiores eius, nulla quasi animi sint illum corrupti necessitatibus laborum dolorem, placeat recusandae explicabo! Sit quisquam consectetur, praesentium vitae ipsam ipsa ut veritatis ex reprehenderit consequuntur totam quam quae magnam sint debitis quos veniam dolorum quod quo impedit? In aliquam delectus eos corrupti, perferendis nulla pariatur iusto illo minima, at dolore sunt! Eaque nesciunt totam vero facilis! Aperiam sequi cum consectetur ut totam, provident blanditiis ad sunt sit exercitationem veritatis nemo consequatur odit suscipit nesciunt quas atque in. Iure iste laboriosam nemo neque, quod incidunt, aspernatur sed minima provident atque a laborum quia, veniam libero blanditiis! Libero dolorem pariatur esse accusantium, aspernatur doloremque, omnis quis voluptatibus at eaque, recusandae qui velit ipsam sapiente ea commodi sed. Distinctio, tempora labore atque vero delectus modi eveniet, exercitationem nobis, aliquam rem natus placeat. Omnis perferendis quibusdam odio, quaerat tempore fugit error, id nulla ullam, aliquam debitis tempora? Aliquam in sunt quia commodi laborum esse incidunt recusandae molestiae temporibus ab consectetur reiciendis, fugiat soluta ullam rerum nobis, reprehenderit magni. Ullam sapiente modi vitae cum maxime ipsum et. Atque ea sunt numquam assumenda non ex ducimus id asperiores, nisi cupiditate quisquam molestiae dicta libero. Hic alias ipsam sunt! Iste reiciendis tenetur, voluptatibus asperiores laborum distinctio ipsam numquam quia optio veritatis id nisi quidem natus harum voluptatum molestias incidunt culpa delectus. Exercitationem explicabo quis, excepturi neque, mollitia molestias iusto distinctio amet rem, veritatis eos! Illum dolorum aliquid ipsam modi eius. Vitae dolore enim tenetur omnis. Ea, dolorum? Deserunt non quia voluptate, unde illo quas perspiciatis sint tempore nesciunt officiis possimus magni neque dolorum aliquam velit illum aut. Veniam impedit, quasi eveniet dolorum, ab consequuntur saepe vel voluptatibus accusamus est, assumenda perferendis molestiae provident. Iste cupiditate eaque voluptas, tenetur quibusdam quo praesentium, eum sequi non impedit nobis similique voluptatem temporibus dicta at. Eos quaerat tempora repudiandae, eligendi error molestias porro est distinctio praesentium eveniet officiis reiciendis tenetur placeat commodi sunt vero rerum pariatur. Veniam suscipit officia nesciunt in eos, repudiandae, facere rem odio nobis numquam optio adipisci laboriosam placeat. Dolorem fugiat eligendi ea laudantium assumenda unde, labore vitae accusamus? Tempore non pariatur nisi vitae illo provident, at consequatur, aperiam sunt officia quisquam consectetur. Dignissimos praesentium quos hic expedita labore reiciendis, fugit quam iste, dolorem harum exercitationem velit omnis dolores, in non voluptatibus accusamus accusantium totam eveniet tempora voluptas ullam enim. Commodi itaque porro aliquid sequi illum, fuga, saepe earum magni minima quidem veritatis ipsam eum cum sunt corporis nihil iusto dolor. Velit iste, ullam, accusantium alias repudiandae soluta vero iusto, praesentium harum tempora quae officia veritatis quasi porro. Cum, minus ut sapiente repellat quod, architecto tempore nihil ducimus autem odit illo natus ipsa mollitia! Itaque atque, molestias, aliquam recusandae fugit ab nihil, totam ex nobis architecto repudiandae facilis laudantium. Nam dolorem mollitia sint. Sapiente, eum in iusto deleniti eaque odio. Quae quidem modi ipsam sint eaque consequatur ea labore aut dolores adipisci nisi omnis repellat nemo, odit architecto rem eius aliquam minus quod ipsum ducimus. Aliquid, eligendi! Fuga et mollitia accusamus laboriosam quibusdam. Sapiente optio exercitationem veritatis ex nisi eaque ipsum nemo doloremque aperiam, eos aut, deserunt necessitatibus quasi ut, ipsa a voluptatem consectetur recusandae quibusdam aliquam! Voluptatem consectetur dolorum, alias quae repudiandae a quibusdam, modi sed excepturi minima debitis aliquam commodi assumenda ut ipsa quasi doloremque non, dolor ducimus. Delectus aperiam consequuntur sapiente exercitationem autem odio doloribus laudantium deleniti tempore libero reiciendis cumque debitis quam temporibus, voluptas natus velit? Exercitationem adipisci praesentium voluptatum? Voluptate modi qui suscipit similique praesentium quas velit dolorum molestias quidem sunt aliquam eum, fugit asperiores rerum amet optio nobis sed eveniet omnis! Eligendi, neque consequatur! Adipisci doloribus sequi at minima magnam maxime incidunt esse fugiat porro perferendis ducimus quae omnis, soluta hic? Dolorem et a assumenda nostrum labore nulla? Nobis vero nemo non, aliquam reiciendis eveniet officiis voluptatibus ullam laudantium totam explicabo veniam qui suscipit necessitatibus fuga minus deserunt. Possimus maxime corrupti, repellat, dolore libero consectetur dolores fugiat, assumenda quaerat tenetur repudiandae praesentium aliquam blanditiis id exercitationem dolorem suscipit quasi veritatis? Nihil voluptatum deserunt adipisci? Nostrum dolor explicabo, soluta accusamus corrupti ab laudantium atque eum!</div>
                <div className='absolute bottom-0 left-0 p-4 h-20 w-full flex flex-row gap-4 items-center'>
                    <Input
                        type="text"
                        style={{ width: '80%', height: '48px' }}
                        placeholder="Type your message here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button
                        type='primary'
                        className="flex items-center justify-center"
                        onClick={handleSendMessage}
                        style={{ height: '48px', width: '10%' }}
                    >
                        <div className="flex items-center gap-2">
                            <BsSend />
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatBotPage