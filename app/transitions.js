export default function(){
  this.transition(
    this.fromRoute('user.index'),
    this.toRoute('user.client'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}