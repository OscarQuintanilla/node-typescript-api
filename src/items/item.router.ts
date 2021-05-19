/**
 * Required External Modules and Interfaces
 */
import express, {Request, Response} from 'express';
import  * as ItemService from './items.service';
import { BaseItem, Item } from './item.interface';

/**
 * Router Definition
 */

export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

itemsRouter.get('/', async (req: Request, res: Response) =>{
  try{
    const items: Item[] = await ItemService.findAll();

    res.status(200).send(items);

  }catch(e){    
    res.send(500).send(e.message);
  
  }
});

// GET items/:id

itemsRouter.get('/:id', async (req: Request, res: Response)=>{
  const id: number = parseInt(req.params.id, 10);

  try {
    const item : Item = await ItemService.find(id);
  
    if (item) {
      res.status(200).send(item);
      
    }

    res.status(404).send('item not found');

  } catch (e) {
    
  }
});

// POST items

itemsRouter.post('/', async (req: Request, res: Response) =>{
  try{
    const item: BaseItem = req.body;
    const createItem = await ItemService.create(item);
    res.status(201).json(createItem);
    
  }catch(e){
    res.status(500).send(e.message);
  }
});

// PUT items/:id

itemsRouter.put('/:id', async (req:Request, res: Response)=>{
  const id: number = parseInt(req.params.id, 10);

  try {
      const existingitem: Item = await ItemService.find(id);
      const itemUpdate: BaseItem = req.body;
      
      if (existingitem) {
        const updatedItem = await ItemService.update(id, itemUpdate);
        return res.status(200).send(updatedItem);

      }

      const newItem = await ItemService.create(itemUpdate);
      res.status(201).send(newItem);

      
    } catch (e) {
      
    }

});

// DELETE items/:id

itemsRouter.delete('/:id', async (req:Request, res:Response)=>{
  const id: number = parseInt(req.params.id, 10);

  try {
    const existingItem: Item = await ItemService.find(id);
    if (existingItem) {
    const removeItem  = await ItemService.remove(id);
    res.status(200).send(removeItem);

    }

    res.status(404).send('Item doesnt exist.'); 

  } catch (e) {
    res.status(500).send(e.message);
  }

});