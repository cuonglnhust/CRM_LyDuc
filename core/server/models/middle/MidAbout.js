'use strict';
import {
    About,
    
} from '../index'
import _ from 'lodash'

class MidAbout {

    updateAbout = async (data) => {
        try {
            let { id } = data
            let about = {}
            if(id) {
                about = await About.findOne({
                    where: {
                        id: parseInt(id)
                    }
                })
                if(about) {
                    about.update(data)
                }else{
                    throw new Error("Không tìm thấy thông tin!")
                }
            }else{
                about = await  About.create(data)
            }
            return about
        } catch (err) {
            throw new Error(err)
        }
    }
    getAbout = async () => {
        try {
            let about = await About.findOne()
            return about
        } catch (err) {
            throw new Error(err)
        }

    }
 
}

export default new MidAbout()