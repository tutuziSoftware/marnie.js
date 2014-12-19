(function(window){
    if('marnie' in window){
        var marnie = window['marnie'];
    }else{
        var marnie = {};
        window['marnie'] = marnie;
    }

    /**
     * とある範囲を指定します。
     * このクラスはイミュータブルです。
     * @param first
     * @param last
     * @param forEachCallback
     * @returns {marnie.Range}
     * @constructor
     */
    marnie.Range = function(first, last, forEachCallback){
        if(this.constructor != marnie.Range){
            return new marnie.Range(first, last, forEachCallback);
        }

        if(first < last){
            this.FIRST = first;
            this.LAST = last;
        }else{
            var swap = first;
            this.FIRST = last;
            this.LAST = swap;
        }

        Object.freeze(this);

        if(typeof forEachCallback === 'function') this.forEach(forEachCallback);
    };

    //デフォルト値
    marnie.Range.prototype.FIRST = 0;
    marnie.Range.prototype.LAST = 0;

    /**
     * 範囲内の値を返します。
     * @param callback
     */
    marnie.Range.prototype.forEach = function(callback){
        var index = 0;

        for(var count = this.FIRST ; count <= this.LAST ; count++, index++){
            callback(count, index);
        }
    };

    /**
     * 範囲内である場合、trueを返します。
     * @param check
     * @returns {boolean}
     */
    marnie.Range.prototype.on = function(check){
        return this.FIRST <= check && check <= this.LAST;
    }

    /**
     * 範囲外である場合、trueを返します。
     * @param check
     * @returns {boolean}
     */
    marnie.Range.prototype.out = function(check){
        return check < this.FIRST || this.LAST < check;
    }

    /**
     * 範囲内か範囲外を判定し、コールバックを実行します。
     * @param check
     */
    marnie.Range.prototype.route = function(check){
        //routeはcheckの値毎にインスタンスを生成する必要がある。
        //thisと関数を紐付けるとメモリリークになりそうなので可能な限り値を
        //オブジェクト内に収めるようにした。
        //
        //第二引数に{on:func, out:func}とする手もあるが、これだと複数の関数が同時に実行出来ない。
        //また、on()out()が分かれている為、onだけ実行したいという場合にも一応対応出来る。
        return {
            _CHECK:check,
            FIRST:this.FIRST,
            LAST:this.LAST,
            on:function(callback){
                check = null;
                if(marnie.Range.prototype.on.call(this, this._CHECK)){
                    callback();
                }
                return this;
            },
            out:function(callback){
                check = null;
                if(marnie.Range.prototype.out.call(this, this._CHECK)){
                    callback();
                }
                return this;
            }
        };
    };
})(window);