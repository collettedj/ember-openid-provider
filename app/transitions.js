export default function(){
  this.transition(
    this.fromRoute('user.index'),
    this.toRoute('user.client'),
    this.use('toUp'),
    this.reverse('toDown')
  );
}