const PriorityQueue = require('../Components/Utils')

describe("Test Minimum heap", ()=>{
    test("Test 1: Simple case", ()=>{
        const array1 = [{val:3},{val:7},{val:10},{val:5}];
        const pq = new PriorityQueue();
        for(const a of array1){
            pq.push(a);
        }
        expect(pq.PQ).toStrictEqual([{val:3},{val:5},{val:7},{val:10}]);
    })
    test("Test2: Complex case", ()=>{
        const array2 = [{x:0,y:0,val:16},{x:12,y:16,val:6},{x:13,y:41,val:2},{x:12,y:1,val:31}];
        const pq = new PriorityQueue();
        for(const a of array2){
            pq.push(a);
        }
        expect(pq.PQ).toStrictEqual([{x:13,y:41,val:2},{x:12,y:16,val:6},{x:0,y:0,val:16},{x:12,y:1,val:31}]);
    })
    test("Test3: Popping method", ()=>{
        const array3 = [{val:12},{val:16},{val:4},{val:19},{val:25}];
        const pq = new PriorityQueue();
        for(const a of array3){
            pq.push(a);
        }
        expect(pq.pop()).toStrictEqual({val:4});
        expect(pq.PQ).toStrictEqual([{val:12},{val:16},{val:19},{val:25}]);
    })
    test("Test 4: Popping method [EdgeCase]: heap underflow", ()=>{
        const array4 = [{val:12},{val:16},{val:4},{val:19},{val:25}];
        const pq = new PriorityQueue();
        for(const a of array4){
            pq.push(a);
        }
        while(pq.PQ.length) pq.pop();
        expect(pq.pop()).toStrictEqual({val:-1});
    })
    test("Test 5: test empty() method", ()=>{
        const array5 = [{val:12},{val:16},{val:4},{val:19},{val:25},{val:3},{val:5},{val:7},{val:10}];
        const pq = new PriorityQueue();
        for(const a of array5){
            pq.push(a);
        }
        expect(pq.empty()).toBe(false);
        while(!pq.empty()) pq.pop();
        expect(pq.empty()).toBe(true);
    })
})